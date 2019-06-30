const MessageHandler = require('../MessageHandler.class');
const Core = require('storbox-core').Core;

class UserInfo extends MessageHandler {

    getChannel() {
        return "user-info";
    }

    async handle(socket, msg) {
        if(socket.token === undefined || socket.token === false) {
            return;
        }

        let user = await Core.getDatabase().getModel("User").getUserByToken(socket.token, socket.isAdmin);
        if(user !== null) {
            socket.emit(this.getChannel(), { success: true, user });
        } else {
            socket.emit(this.getChannel(), { success: false });
        }
    }

}

module.exports = UserInfo;
