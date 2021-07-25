#!/bin/bash

pm2 kill
sleep 5

cd ~
cd ./app/step2/zip

npm i
sleep 10

pm2 start app.js