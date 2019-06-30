const socketIo = require('socket.io');
const fs = require('fs');
const {promisify} = require('util');
const readdir = promisify(fs.readdir);
const Log = require('storbox-core').Log;

class SocketIO {

    constructor() {
        this.io = null;
        this._handlers = {};
    }

    injectIntoServer(http) {
        this.io = socketIo(http);
        this.io.on('connection', (socket) => {
            this.initHandlers(socket);
        });
    }

    async loadHandlers() {
        Log.debug("Loading socket handlers");
        let items = await readdir(`${__dirname}/handlers`);

        items.forEach((item) => {
            if(item.indexOf(".js") === -1) return;
            let LoadedHandler = require(`${__dirname}/handlers/${item}`);
            let handler = new LoadedHandler();

            this._handlers[handler.getChannel()] = (socket, msg) => handler.handle(socket, msg);
            Log.debug("Loaded socket handler for \"" + handler.getChannel() + "\"");
        });
    }

    initHandlers(socket) {
        Log.debug("New socket");
        for(let channel in this._handlers) {
            socket.on(channel, msg => this._handlers[channel](socket, msg));
        }
    }

}

module.exports = SocketIO;
