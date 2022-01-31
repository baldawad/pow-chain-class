const Block = require('./models/Block');
const db = require('./db');
const jayson = require('jayson');
const {startMining,stopMining} = require('./mine');
const {PORT} = require('./config');
const { utxos } = require('./db');

// create a server
const server = new jayson.Server({
  startMining: function(_, callback) {
    callback(null, "success!");
    startMining();
  },
  stopMining: function(_, callback) {
    callback(null, "success!");
    stopMining();
  },
  getBalance: function([address], callback) {
    const addressUTXOs = utxos.filter(x => {
      return x.owner === address && !x.spent;
    })

    //console.log(address)   //0447c30ae9ed4c13cf120943bb94acf7e5e2cba7809bbf0318a307ba0c6fe37136f2500cd73477dbd164934e0a9b0e418699936f1042e5c379ed18668c8c19d062
    //console.log(" ")
    //console.log(addressUTXOs[0].owner)

    const sum = addressUTXOs.reduce((p,x) => p+x.amount,0)
    callback(null, sum); 
  }
});

server.http().listen(PORT);