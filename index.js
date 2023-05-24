const Discord = require('discord.js');
const client = new Discord.Client({ intents: 3276799});
const { connect } = require('mongoose');
const fs = require('fs');

client.config = require('./config.js');
client.commands = new Discord.Collection();
client.color = '#ff0000';

const functionFolders = fs.readdirSync(`functions`);
functionFolders.forEach((folder) => {
    const functionFiles = fs.readdirSync(`functions/${folder}`).filter((file) => file.endsWith('.js'));
    functionFiles.forEach((file) => {
        const fileData = fs.readFileSync(`./functions/${folder}/${file}`, {encoding:'utf8', flag:'r'});
        if (fileData.length > 0) {
            require(`./functions/${folder}/${file}`)(client);
        }
    });
});

client.login(client.config.BOT_token).then(async () => {
    await connect(client.config.DB_token).catch(console.error)
});
client.handleEvents();
client.handleCommands();
