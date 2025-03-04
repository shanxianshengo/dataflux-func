# DataFlux Func

DataFlux Func 是一个基于 Python 的脚本开发、管理、执行平台。

> `DataFlux Func` 读作`data flux function`，系统内有时会缩写为`DFF`。

前身为 [观测云](https://guance.com/) 下属的一个函数计算组件，目前已成为可独立运行的系统。

本系统主要分为 2 个部分：

- Server：使用 Node.js + Express 构建，主要提供 Web UI 服务、对外 API 接口
- Worker：使用 Python3 + Celery 构建，主要提供 Python 脚本的执行环境（内含 Beat 模块）

> 目前 DataFlux Func 正在快速开发过程中，我们建议始终安装最新版使用，因此暂不提供历史版本。

## 相关文档

有关 DataFlux Func 的相关文档请参考以下链接：

- [官方网站](https://func.guance.com)
- [快速开始](https://func.guance.com/doc/quick-start/)
- [开发手册](https://func.guance.com/doc/development-guide/)
- [部署和维护手册](https://func.guance.com/doc/maintenance-guide/)
- [文档库](https://func.guance.com/doc/)
- [观测云官方网站](https://guance.com/)

## LICENSE

[AGPL v3](LICENSE)