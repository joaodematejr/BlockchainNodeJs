const WebSocket = require('ws')
const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

//HTTP_PORT=3002 P2P_PORT=5003 PEERS="ws://localhost:5001,ws://localhost:5002" npm run dev

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain
        this.sockets = []
    }

    listen() {
        const server = new WebSocket.Server({ port: P2P_PORT })
        server.on('connection', (socket) => this.connectSocket(socket))
        this.connectToPeers()
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`)
    }

    connectToPeers() {
        peers.forEach((peer) => {
            const socket = new WebSocket(peer)
            socket.on('open', () => this.connectSocket(socket))
        })
    }

    connectSocket(socket) {
        this.sockets.push(socket)
        console.log('Connected to a new peer: ' + socket.url)

        this.messageHandler(socket)
        this.sendChain(socket)
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain))
    }

    messageHandler(socket) {
        socket.on('message', (message) => {
            const data = JSON.parse(message)
            this.blockchain.replaceChain(data)
        })
    }

    syncChains() {
        this.sockets.forEach((socket) => {
            this.sendChain(socket)
        })
    }


}

module.exports = P2pServer