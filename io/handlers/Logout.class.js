const MessageHandler = require('../MessageHandler.class');
const Core = require('storbox-core').Core;

class Logout extends MessageHandler {

    getChannel() {
        return "logout";
    }

    async handle(socket, msg) {
        let user = await Core.getDatabase().getModel("User").getUserByToken(socket.token);
        if(user !== null) {
            user.loginToken = undefined;
            await user.save();
            socket.token = undefined;
            socket.isAdmin = undefined;
            socket.emit(this.getChannel(), { success: true });
        } else {
            socket.emit(this.getChannel(), { success: false });
        }
    }

}

module.exports = Logout;
