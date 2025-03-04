#!/bin/bash
set -e

META_PATH=/etc/dataflux-func
if [ -f ${META_PATH} ]; then
    source ${META_PATH}
fi

# 本脚本参考了docker官方文档，以及以下文章
#   https://www.cnblogs.com/helf/p/12889955.html

function stopPrevStack {
    docker stack remove "$1"

    isRunning=1
    while [ $isRunning -ne 0 ]; do
      echo 'Waiting...'
      sleep 3

      isRunning=`docker ps | grep "$1_" | wc -l`
    done
}

function blankLine {
    echo ''
}

function log {
    echo -e "\033[33m$1\033[0m"
}

# 处理选项
OPT_MINI=FALSE
OPT_PORT=DEFAULT
OPT_INSTALL_DIR=DEFAULT
OPT_NO_MYSQL=FALSE
OPT_NO_REDIS=FALSE

# 处理选项（在线安装专用）
OPT_DEV=FALSE
OPT_IMAGE=DEFAULT

while [ $# -ge 1 ]; do
    case $1 in
        --mini )
            OPT_MINI=TRUE
            shift
            ;;

        --port )
            OPT_PORT=$2
            shift 2
            ;;

        --install-dir=* )
            OPT_INSTALL_DIR="${1#*=}"
            shift
            ;;
        --install-dir )
            OPT_INSTALL_DIR=$2
            shift 2
            ;;

        --no-mysql )
            OPT_NO_MYSQL=TRUE
            shift
            ;;

        --no-redis )
            OPT_NO_REDIS=TRUE
            shift
            ;;

        --dev )
            OPT_DEV=TRUE
            shift
            ;;

        --image=* )
            OPT_IMAGE="${1#*=}"
            shift
            ;;
        --image )
            OPT_IMAGE=$2
            shift 2
            ;;

        * )
            shift
            ;;
    esac
done

# 配置
__PREV_DIR=${PWD}
__SERVER_SECRET=`openssl rand -hex 8`
__MYSQL_PASSWORD=`openssl rand -hex 8`

__CONFIG_FILE=data/user-config.yaml
__DOCKER_STACK_FILE=docker-stack.yaml
__DOCKER_STACK_EXAMPLE_FILE=docker-stack.example.yaml

__PROJECT_NAME=dataflux-func

__RESOURCE_BASE_URL=https://static.guance.com/dataflux-func/resource

MYSQL_IMAGE=pubrepo.jiagouyun.com/dataflux-func/mysql:5.7.26
REDIS_IMAGE=pubrepo.jiagouyun.com/dataflux-func/redis:5.0.7
DATAFLUX_FUNC_IMAGE=pubrepo.jiagouyun.com/dataflux-func/dataflux-func:latest

# 根据当前架构自动选择镜像
case `uname -m` in
    'x86_64' )
        MYSQL_IMAGE=pubrepo.jiagouyun.com/dataflux-func/mysql:5.7.26
        REDIS_IMAGE=pubrepo.jiagouyun.com/dataflux-func/redis:5.0.7
        ;;

    'aarch64' )
        MYSQL_IMAGE=pubrepo.jiagouyun.com/dataflux-func/mariadb-arm64:10.4.21
        REDIS_IMAGE=pubrepo.jiagouyun.com/dataflux-func/redis-arm64:5.0.7
        ;;

    * )
        shift
        ;;
esac

# 启用dev 部署时，项目名/资源等改为dev 专用版
if [ ${OPT_DEV} = "TRUE" ]; then
    __PROJECT_NAME=dataflux-func-dev
    __RESOURCE_BASE_URL=https://static.guance.com/dataflux-func/resource-dev
    DATAFLUX_FUNC_IMAGE=pubrepo.jiagouyun.com/dataflux-func/dataflux-func:dev
fi

_PORT=8088
if [ ${OPT_PORT} != "DEFAULT" ]; then
    _PORT=${OPT_PORT}
fi

_INSTALL_DIR=/usr/local/${__PROJECT_NAME}
if [ ${OPT_INSTALL_DIR} != "DEFAULT" ]; then
    # 指定安装位置
    _INSTALL_DIR=${OPT_INSTALL_DIR}/${__PROJECT_NAME}
else
    # 默认安装位置，并优先使用上次安装位置
    if [ ${INSTALLED_DIR} ]; then
        log "Found previous install directory: ${INSTALLED_DIR}"
        _INSTALL_DIR=${INSTALLED_DIR}
    fi
fi

if [ ${OPT_IMAGE} != "DEFAULT" ]; then
    DATAFLUX_FUNC_IMAGE=${OPT_IMAGE}
fi

log "Project name: ${__PROJECT_NAME}"
log "Port        : ${_PORT}"
log "Install dir : ${_INSTALL_DIR}/"
log "Image       : ${DATAFLUX_FUNC_IMAGE}"


# 安装前根据Meta检查
if [ ${INSTALLED_DIR} -a ${INSTALLED_DIR} != ${_INSTALL_DIR} ]; then
    log ""
    log "You are reinstalling/upgrading DataFlux Func into a different directory by mistake."
    log "  Previous (from ${META_PATH}):"
    log "    -> ${INSTALLED_DIR}"
    log "  Current:"
    log "    -> ${_INSTALL_DIR} "
    log "When you are reinstalling/upgrading DataFlux Func, the --install-dir option is not needed."
    exit 1
fi

# 关闭之前的Stack
stopPrevStack ${__PROJECT_NAME}

# 拉取必要镜像
blankLine
log "Pulling image: ${DATAFLUX_FUNC_IMAGE}"
docker pull ${DATAFLUX_FUNC_IMAGE}

# 未关闭MySQL 时，需要拉取镜像
if [ ${OPT_NO_MYSQL} = "FALSE" ]; then
    log "Pulling image: ${MYSQL_IMAGE}"
    docker pull ${MYSQL_IMAGE}
fi

# 未关闭Redis 时，需要拉取镜像
if [ ${OPT_NO_REDIS} = "FALSE" ]; then
    log "Pulling image: ${REDIS_IMAGE}"
    docker pull ${REDIS_IMAGE}
fi

# 创建运行环境目录并前往
blankLine
mkdir -p ${_INSTALL_DIR}/{data,data/resources/extra-python-packages,data/logs,data/sqldump,mysql,redis}

cd ${_INSTALL_DIR}
log "In ${_INSTALL_DIR}"

# 下载docker stack 示例文件
blankLine
log "Downloading docker stack example file"

if [ `command -v wget` ]; then
    wget ${__RESOURCE_BASE_URL}/${__DOCKER_STACK_EXAMPLE_FILE} -O ${__DOCKER_STACK_EXAMPLE_FILE}

elif [ `command -v curl` ]; then
    curl -o ${__DOCKER_STACK_EXAMPLE_FILE} ${__RESOURCE_BASE_URL}/${__DOCKER_STACK_EXAMPLE_FILE}

else
    echo 'No `curl` or `wget`, abort.'
    exit 1
fi

# 创建预配置文件（主要目的是减少用户在配置页面的操作——只要点确认即可）
blankLine
if [ ! -f ${__CONFIG_FILE} ]; then
    echo -e "# Pre-generated config: \
\nSECRET          : ${__SERVER_SECRET} \
\nMYSQL_HOST      : mysql \
\nMYSQL_PORT      : 3306 \
\nMYSQL_USER      : root \
\nMYSQL_PASSWORD  : ${__MYSQL_PASSWORD} \
\nMYSQL_DATABASE  : dataflux_func \
\nREDIS_HOST      : redis \
\nREDIS_PORT      : 6379 \
\nREDIS_DATABASE  : 5" \
> ${__CONFIG_FILE}

    log "New config file with random secret/password created:"
else
    log "Config file already exists:"
fi
log "  ${_INSTALL_DIR}/${__CONFIG_FILE}"

# 创建docker stack 配置文件
blankLine
if [ ! -f ${__DOCKER_STACK_FILE} ]; then
    cp ${__DOCKER_STACK_EXAMPLE_FILE} ${__DOCKER_STACK_FILE}

    # 创建配置文件并使用随机密钥/密码
    if [ ${OPT_MINI} = "TRUE" ]; then
        # 启用mini方式安装，去除Worker default 配置部分
        sed -i "/# WORKER DEFAULT START/,/# WORKER DEFAULT END/d" \
            ${__DOCKER_STACK_FILE}
    else
        # 默认方式安装，去除Worker mini 配置部分
        sed -i "/# WORKER MINI START/,/# WORKER MINI END/d" \
            ${__DOCKER_STACK_FILE}
    fi

    # 关闭MySQL 时，去除MySQL 配置部分
    if [ ${OPT_NO_MYSQL} = "TRUE" ]; then
        sed -i "/# MYSQL START/,/# MYSQL END/d" \
            ${__DOCKER_STACK_FILE}
    fi

    # 关闭Redis 时，去除Redis 配置部分
    if [ ${OPT_NO_REDIS} = "TRUE" ]; then
        sed -i "/# REDIS START/,/# REDIS END/d" \
            ${__DOCKER_STACK_FILE}
    fi

    sed -i \
        -e "s#<MYSQL_PASSWORD>#${__MYSQL_PASSWORD}#g" \
        -e "s#<MYSQL_IMAGE>#${MYSQL_IMAGE}#g" \
        -e "s#<REDIS_IMAGE>#${REDIS_IMAGE}#g" \
        -e "s#<DATAFLUX_FUNC_IMAGE>#${DATAFLUX_FUNC_IMAGE}#g" \
        -e "s#<PORT>#${_PORT}#g" \
        -e "s#<INSTALL_DIR>#${_INSTALL_DIR}#g" \
        ${__DOCKER_STACK_FILE}

    log "New docker stack file with random secret/password created:"

else
    log "Docker stack file already exists:"

    # 为MySQL服务添加TLS版本
    if [ `grep "\-\-tls\-version" ${__DOCKER_STACK_FILE} | wc -l` -eq 0 ]; then
            echo 'Add `--tls-version=TLSv1.2` to mysql service'
            sed -i \
                -e "s#command: --innodb-large-prefix=on#command: --tls-version=TLSv1.2 --innodb-large-prefix=on#g" \
                ${__DOCKER_STACK_FILE}
    fi
fi
log "  ${_INSTALL_DIR}/${__DOCKER_STACK_FILE}"

# 创建logrotate配置
blankLine
if [ `command -v logrotate` ] && [ -d /etc/logrotate.d ]; then
    echo -e "${_INSTALL_DIR}/data/logs/${__PROJECT_NAME}.log { \
\n    missingok \
\n    copytruncate \
\n    compress \
\n    daily \
\n    rotate 7 \
\n    dateext \
\n}" \
> /etc/logrotate.d/${__PROJECT_NAME}
fi
log "Logrotate config file created:"
log "  /etc/logrotate.d/${__PROJECT_NAME}"

# 执行部署
blankLine
log "Deploying: ${__PROJECT_NAME}"
docker stack deploy ${__PROJECT_NAME} -c ${__DOCKER_STACK_FILE}

# 等待完成
blankLine
log "Please wait 30 seconds for the system to be ready..."
sleep 30
docker ps

# 返回之前目录
cd ${__PREV_DIR}

# 提示信息
blankLine
if [ ${OPT_DEV} = "TRUE" ]; then
    log "Notice: A DEV version is deployed"
fi
if [ ${OPT_MINI} = "TRUE" ]; then
    log "Notice: DataFlux Func is running in MINI mode"
fi
if [ ${OPT_INSTALL_DIR} != "DEFAULT" ]; then
    log "Notice: DataFlux Func is deployed using a custom install dir: ${_INSTALL_DIR}"
fi
if [ ${OPT_IMAGE} != "DEFAULT" ]; then
    log "Notice: DataFlux Func is deployed using a custom image: ${DATAFLUX_FUNC_IMAGE}"
fi
if [ ${OPT_NO_MYSQL} = "TRUE" ]; then
    log "Notice: Builtin MySQL is NOT deployed, please specify your MySQL server configs in setup page."
fi
if [ ${OPT_NO_REDIS} = "TRUE" ]; then
    log "Notice: Builtin Redis is NOT deployed, please specify your Redis server configs in setup page."
fi

blankLine
log "Port:"
log "    ${_PORT}"
log "Installed dir:"
log "    ${_INSTALL_DIR}"
log "To shutdown:"
log "    $ docker stack remove ${__PROJECT_NAME}"
log "To start:"
log "    $ docker stack deploy ${__PROJECT_NAME} -c ${_INSTALL_DIR}/${__DOCKER_STACK_FILE}"
log "To uninstall:"
log "    $ docker stack remove ${__PROJECT_NAME}"
log "    $ rm -rf ${_INSTALL_DIR}"
log "    $ rm -f /etc/logrotate.d/${__PROJECT_NAME}"

blankLine
log "Now open http://<IP or Hostname>:${_PORT}/ and have fun!"

# 写入Meta信息
if [ ! -f ${META_PATH} ]; then
    echo "INSTALLED_DIR=${_INSTALL_DIR}" > ${META_PATH}
fi
