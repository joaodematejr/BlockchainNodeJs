const express = require('express');
const BlockChain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

/* $ HTTP_PORT = 3002 npm run dev */

const app = express();
const bc = new BlockChain();

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));