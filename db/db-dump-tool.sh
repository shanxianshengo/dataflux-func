#!/bin/bash

passwd=$1

time=`date '+%Y-%m-%d'`
dumpname=dataflux_func_${time}.sql

rm -f dumpname;
mysqldump -h 127.0.0.1 -uroot -p${passwd} \
    --add-drop-table \
    --add-drop-trigger \
    --add-locks \
    --allow-keywords \
    --complete-insert \
    --default-character-set=utf8mb4 \
    --disable-keys \
    --hex-blob \
    --quick \
    --column-statistics=0 \
    --ssl-mode=disabled \
    dataflux_func > $dumpname
