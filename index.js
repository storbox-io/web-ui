const WebModule = require('storbox-core').WebModule;
const Log = require('storbox-core').Log;
const SocketIO = require('./io/SocketIO.class');
const WebServer = require('./web/WebServer.class');

class WebUIModule extends WebModule {

    getName() {
        return "WebUI";
    }

    getType() {
        return "web";
    }

    async run(configPath) {
        let socketio = new SocketIO();

        let web = new WebServer(8080);
        web.initSockets(socketio);
        await web.run();
        Log.info("Webserver is running");
    }

}

module.exports = WebUIModule;
