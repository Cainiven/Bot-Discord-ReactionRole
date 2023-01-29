const config = require('../config.json')
module.exports = async (bot, reaction, user) => {

    if (user.bot) return;

    for (var i=0; i < config.roles.length; i++) {
        if (reaction.message.id == config.roles[i].msg_id && reaction.emoji.name == config.roles[i].emoji_name) {
            reaction.message.guild.members.cache.get(user.id).roles.add(config.roles[i].role_id)
            return;
        }
    }

}