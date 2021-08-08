#!/bin/bash

pm2 kill
sleep 5

cd ~
cd ./app/step2/zip/

npm i
sleep 5

npm run deploy