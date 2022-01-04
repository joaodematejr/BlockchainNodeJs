const Block = require('./block.js');

const block = new Block('15156', '121as2d1as2d1a2s1das', 'asdasdas10515115', '100');

console.log(block.toString());

console.log(Block.genesis().toString());

const firstBlock = Block.mineBlock(Block.genesis(), 'R$100');

console.log(firstBlock.toString());

