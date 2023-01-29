const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
const bot = new Discord.Client();
const config = require('./config.json');
const PREFIX = config.prefix;

// ----------------- Config -----------------
bot.commands = new Enmap()
bot.prefix = PREFIX

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    var eventName = file.split('.')[0]
    bot.on(eventName, event.bind(null, bot))
    delete require.cache[require.resolve("./events/"+file)]
  })
})
fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let props = require(`./commands/${file}`)
    let commandName = file.split('.')[0]
    bot.commands.set(commandName, props)
  })
})
// -----------------------------------------

bot.login(config.token);
