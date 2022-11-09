const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const loadCommands = require('./loaders/loadCommands');
const loadEvents = require('./loaders/loadEvents');
const config = require('./config');

bot.commands = new Discord.Collection();
bot.color = '#ff0000';
bot.function = {
    createId: require('./functions/createId'),
    generateCaptcha: require('./functions/generateCaptcha'),
    welcome: require('./functions/welcome')
}

bot.login(config.token);
loadCommands(bot).then();
loadEvents(bot).then();
