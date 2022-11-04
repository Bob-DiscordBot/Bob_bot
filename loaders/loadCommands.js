const fs = require('node:fs');

module.exports = async bot => {

    fs.readdirSync('./commands').filter(f => f.endsWith('.js')).forEach((file) => {

        let command = require(`../commands/${file}`);
        if (!command.name || typeof command.name !== 'string') throw new TypeError(`The ${file.slice(0, file.length - 3)} has no name !`);
        bot.commands.set(command.name, command);
        console.log(`Command ${file} loaded successfully !`);
    });
}
