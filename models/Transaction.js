const {utxos} = require('./../db');

class Transaction{
    constructor(inputs,outputs){
        this.input =inputs
        this.output = outputs
    }

    execute(){
        this.input.forEach(input => {
            input.spent = true
        })

        this.output.forEach(output => {
            utxos.push(output)
        })
    }
}

module.exports = Transaction