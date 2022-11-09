const Discord = require('discord.js');
const loadDatabase = require('../loaders/loadDatabase');
const loadSlashCommand = require('../loaders/loadSlashCommands');

module.exports = async bot => {

    bot.db = await loadDatabase();
    bot.db.connect(function () {
        console.log('Database connected successfully !');
    });

    await loadSlashCommand(bot);

    console.log(`${bot.user.tag} is online !`);
}
