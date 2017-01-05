apt update
apt install git nodejs
git clone https://github.com/ftes/clicker-server.git
cd clicker-server/server
npm install
nodejs index.js --web=4001
