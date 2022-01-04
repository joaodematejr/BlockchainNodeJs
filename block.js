class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  toString() {
    return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Hash      : ${this.hash.substring(0, 10)}
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
    return new this('Genesis time', '-----', 'f1r57h45h', [])
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now()
    const lastHash = lastBlock.hash
    const hash = "a-fazer-hash"

    return new this(timestamp, lastHash, hash, data)
  }
}

module.exports = Block
