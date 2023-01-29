const fs = require('fs')
const config = require('../config.json')
exports.run = async (bot, message) => {

    const PREFIX = bot.prefix
    const args = message.content.substring(PREFIX.length).split (" ");

    const channelM = message.mentions.channels.first();
    const msgid = args[2]
    const roleM = message.mentions.roles.first();
    const emojiname = args[4]

    if (!channelM) return message.channel.send(":x: Veuillez mentionner un channel | ``" + PREFIX + "reactionrole [#channel] [MSG ID] [@role] [emoji name]``")
    if (!msgid) return message.channel.send(":x: Veuillez entrer l'identifiant d'un message | ``" + PREFIX + "reactionrole [#channel] [MSG ID] [@role] [emoji name]``")
    if (!roleM) return message.channel.send(":x: Veuillez mentionner un role | ``" + PREFIX + "reactionrole [#channel] [MSG ID] [@role] [emoji name]``")
    if (!emojiname) return message.channel.send(":x: Veuillez entrer le nom d'un emoji ou le mentionner si c'est un emoji Discord | ``" + PREFIX + "reactionrole [#channel] [MSG ID] [@role] [emoji name]``")
    if (emojiname.startsWith("<")) return message.channel.send(":x: Veuillez entrer le nom d'un emoji ou le mentionner si c'est un emoji Discord | ``" + PREFIX + "reactionrole [#channel] [MSG ID] [@role] [emoji name]``")

    var data = {
        "channel_id": channelM.id,
        "msg_id": msgid,
        "role_id": roleM.id,
        "emoji_name": emojiname
    }
    config["roles"].push(data)
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))

    bot.channels.cache.get(channelM.id).messages.fetch(msgid).then(m => {
        let check = 0
        m.guild.emojis.cache.map(x => {
            if (x.name == emojiname) {
                var h = m.react(m.guild.emojis.cache.get(x.id))
                check = 1
                message.channel.send(":white_check_mark: Ajouté avec succès")
            }
        })
        if (check == 0) {m.react(emojiname); message.channel.send(":white_check_mark: Ajouté avec succès")}
    })
}