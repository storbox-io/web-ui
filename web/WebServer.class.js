const express = require('express');
const http = require('http');
const log = require('storbox-core').Log;

class WebServer {

    constructor(port) {
        this.port = port;
        this.app = express();

        this.http = http.Server(this.app);
    }

    async run() {
        this.app.get('/', (req, res) => {
           res.send("storBox Server");
        });

        if(this.socketIo !== undefined) {
            await this.socketIo.loadHandlers();
            this.http.listen(this.port, () => {
                log.info("HTTP listening on *:" + this.port);
            });
        } else {
            this.http.listen(this.port, () => {
                log.info("HTTP listening on *:" + this.port);
            });
        }
    }

    initSockets(socketIo) {
        this.socketIo = socketIo;
        this.socketIo.injectIntoServer(this.http);
    }

}

module.exports = WebServer;
