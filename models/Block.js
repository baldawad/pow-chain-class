const SHA256 = require("crypto-js/sha256");
class Block{
    constructor(){
        this.timeStamp = Date.now()
        this.nonce = 0;
        this.transactions = []
    }

    hash(){
        //console.log(JSON.stringify(this))
        return SHA256(JSON.stringify(this)).toString()
    }

    addTransaction(tx){
        this.transactions.push(tx)
    }

    execute() {
        this.transactions.forEach(x => x.execute());
        null;
      }
}

module.exports = Block