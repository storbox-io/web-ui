const WebModule = require('storbox-core').WebModule;
const Log = require('storbox-core').Log;

class WebUIModule extends WebModule {

    getName() {
        return "WebUI";
    }

    getType() {
        return "web";
    }

    run(configPath) {
        Log.info("Hello from WebUI!");
    }

}

module.exports = WebUIModule;
