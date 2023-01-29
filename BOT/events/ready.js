const config = require('../config.json')
module.exports = async (bot) => {
  console.log("****************************************************************\n" +
      "Vous utiliser le code de: Cainiven#5250\n" +
      `Votre bot: ${bot.user.tag} est en ligne !\n` +
      "Dashboard: https://panel.automessage.fr/guilds/" +
      "Du serveur Discord: https://discord.gg/TcSVw6tq5T\n" +
      "****************************************************************")

  for (let i=0; i < config.roles.length; i++) {
    bot.channels.cache.get(config.roles[i].channel_id).messages.fetch(config.roles[i].msg_id).then(m => {
      let check = 0
      m.guild.emojis.cache.map(x => {
        if (x.name == config.roles[i].emoji_name) {
          var h = m.react(m.guild.emojis.cache.get(x.id))
          check = 1
        }
      })
      if (check == 0) {m.react(config.roles[i].emoji_name)}
    })
  }
}
