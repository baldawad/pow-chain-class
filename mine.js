const Blockchain = require('./models/Blockchain');
const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const {PUBLIC_KEY} = require('./config');

const BLOCK_REWARD = 10

const TARGET_DIFFICULTY = BigInt("0x00" + "F".repeat(62));
const db = require('./db');

let mining = true

mine()

function startMining(){
    mining=true
    mine()
}

function stopMining(){
    mining=false
}

function mine(){
    if (!mining) return;
    
    const newBlock = new Block()

    //TODO Add transactions from the mempool

    const coinbaseUTXO = new UTXO(PUBLIC_KEY,BLOCK_REWARD)
    const coinbaseTX = new Transaction([],[coinbaseUTXO])

    newBlock.addTransaction(coinbaseTX)
    
    while(BigInt('0x'+newBlock.hash()) >= TARGET_DIFFICULTY){
        newBlock.nonce+=1
    }

    newBlock.execute();
    
    db.blockchain.addBlock(newBlock)
    console.log(`Just mined block #${db.blockchain.blockHeight()} with a hash of ${newBlock.hash()} at nonce ${newBlock.nonce}`)

    setTimeout(mine,5000)
}

module.exports = {
    startMining,
    stopMining}