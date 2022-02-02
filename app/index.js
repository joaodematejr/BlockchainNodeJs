const express = require('express');
const BlockChain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

/* $ HTTP_PORT = 3002 npm run dev */

const app = express();
const bc = new BlockChain();

app.use(express.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log('nem block', block.toString());
    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));