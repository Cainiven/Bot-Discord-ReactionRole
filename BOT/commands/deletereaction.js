const fs = require('fs')
const config = require('../config.json')
exports.run = async (bot, message) => {

    const PREFIX = bot.prefix
    const args = message.content.substring(PREFIX.length).split (" ");
    const msgid = args[1];
    const roleM = message.mentions.roles.first();

    if (!msgid) return message.channel.send(":x: Vous devez rentrer l'identifiant du message à delete | ``" + PREFIX + "deletereaction [MSG ID] [@role]``")
    if (!roleM) return message.channel.send(":x: Vous devez mentionner le role à delete | ``" + PREFIX + "deletereaction [MSG ID] [@role]``")

    for (var i=0; i < config.roles.length; i++) {
        if (config["roles"][i].msg_id == msgid && config["roles"][i].role_id == roleM.id) {
            config.roles.splice(config.roles[i], 1)
            message.channel.send(":white_check_mark: Supprimé avec succès")
        }
    }
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
}