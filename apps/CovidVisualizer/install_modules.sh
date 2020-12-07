#!/bin/sh
npm cache clean --force &
PID=$!
wait $PID
echo "[INFO]\t\t**************************Reseted cache for npm. pid: $PID**************************\n\n"
rm -r node_modules
echo "[INFO]\t\t**************************Deleted node_modules folder successfully.**************************\n\n"
rm package-lock.json
npm install --package-lock-only
echo "[INFO]\t\t**************************Deleted package-lock.json file successfully.**************************\n\n"
npx npm-force-resolutions
echo "[INFO]\t\t**************************Force npm resolutions successfully.**************************\n\n"
npm install
echo "[INFO]\t\t**************************Installed npm packages successfully.**************************\n\n"
