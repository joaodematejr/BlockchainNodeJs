const SHA256 = require('crypto-js/sha256')
const { DIFFICULTY } = require('../config')

class Block {
    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
    }

    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Hash      : ${this.hash.substring(0, 10)}
            Nonce     : ${this.nonce}
            Data      : ${this.data}`
    }

    /* 
      O que é Genesis em blockchain?
      O Bloco Genesis, também conhecido como Bloco 0, 
      é o primeiro bloco ao qual blocos adicionais em uma cadeia de blocos são adicionados . 
      É efetivamente o ancestral ao qual todos os outros blocos podem rastrear sua linhagem, 
      uma vez que cada bloco faz referência ao anterior. 
      */

    static genesis() {
        return new this('Genesis time', '-----', 'f1r57h45h', [], 0)
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp
        const lastHash = lastBlock.hash
        let nonce = 0
        do {
            nonce++
            timestamp = Date.now()
            hash = Block.hash(timestamp, lastHash, data, nonce)
        } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))

        return new this(timestamp, lastHash, hash, data, nonce)
    }

    //SHA - 256

    static hash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString()
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce } = block
        return Block.hash(timestamp, lastHash, data, nonce)
    }
}

module.exports = Block