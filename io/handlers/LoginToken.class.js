const MessageHandler = require('../MessageHandler.class');
const Core = require('storbox-core').Core;

class LoginToken extends MessageHandler {

    getChannel() {
        return "login-token";
    }

    async handle(socket, msg) {
        if(msg.admin === undefined) socket.isAdmin = false;

        if(msg.token.trim() === "") {
            socket.emit(this.getChannel(), { success: false });
            return;
        }
        let user = await Core.getDatabase().getModel("User").getUserByToken(msg.token, msg.admin);
        if(user !== null) {
            socket.emit(this.getChannel(), { success: true });
            socket.token = msg.token;
            socket.isAdmin = user.admin;
        } else {
            socket.emit(this.getChannel(), { success: false });
        }
    }

}

module.exports = LoginToken;
