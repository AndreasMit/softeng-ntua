#!/bin/sh
sudo apt update

curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash
sudo apt-get install nodejs

git clone https://github.com/ntua/TL21-43.git

npm install cors
npm install react-scripts
npm install uuidv4

cd ~/TL21-43/api
node index.js

cd ~/TL21-43/frontend
npm start

cd ~/TL21-43/cli/se2143
npm install -g

export NODE_NO_WARNINGS=1


