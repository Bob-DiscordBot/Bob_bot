const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const loadCommands = require('./loaders/loadCommands');
const loadEvents = require('./loaders/loadEvents');
const config = require('./config');

bot.commands = new Discord.Collection();
bot.color = '#ff0000';

bot.login(config.token);
loadCommands(bot);
loadEvents(bot);
