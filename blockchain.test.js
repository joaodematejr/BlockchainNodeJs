const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let bc;
    let bc2;

    beforeEach(() => {
        bc = new Blockchain;
        bc2 = new Blockchain;
    });

    it('starts with the genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        data = "arquivo.pdf";
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        bc2.addBlock('R$500');
        expect(bc.isValidChain(bc2.chain)).toBe(true);

    });
});