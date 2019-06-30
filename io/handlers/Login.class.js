const MessageHandler = require('../MessageHandler.class');
const Core = require('storbox-core').Core;

class Login extends MessageHandler {

    getChannel() {
        return "login";
    }

    async handle(socket, msg) {
        if(msg.admin === undefined) msg.admin = false;
        console.log(msg);
        let okay = await Core.getDatabase().getModel("User").login(msg.username, msg.password, msg.admin);

        let message = { success: okay };

        if(okay) {
            let token = await Core.getDatabase().getModel("User").createNewToken(msg.username);

            if(token) {
                socket.token = token;
                socket.isAdmin = msg.admin;

                message.token = token;
            }
        }

        socket.emit(this.getChannel(), message);
    }

}

module.exports = Login;
