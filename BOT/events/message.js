const Discord = require('discord.js')
module.exports = async (bot, message) => {

  if (message.author.bot) return;
  if (message.author.id === bot.user.id) return;
  if (!message.guild) return;

  if (message.content.indexOf(bot.prefix) !== 0) return;

  var PREFIX = bot.prefix
  const args = message.content.substring(PREFIX.length).split (" ");
  const args2 = message.content.slice(bot.prefix.length).trim().split(/ +/g)
  const command = args2.shift().toLowerCase()
  const cmd = bot.commands.get(command)

  if (!cmd) return;
  cmd.run(bot, message, args2)

}
