const fs = require('fs');
const chalk = require('chalk');

module.exports = (client) => {
    client.handleCommands = async() => {

        try {
            let cmdCount = 0;
            fs.readdirSync(`commands`).forEach((folder) => {
                const eventFiles = fs.readdirSync(`commands/${folder}`).filter((file) => file.endsWith('.js'));

                fs.readdirSync(`commands/${folder}`).filter(f => f.endsWith('.js')).forEach((file) => {
                    let command = require(`../../commands/${folder}/${file}`);

                    const cmdData = fs.readFileSync(`./commands/${folder}/${file}`, {encoding:'utf8', flag:'r'});
                    if (cmdData.length > 0) {
                        cmdCount++;

                        if (!command.name || typeof command.name !== 'string') throw new TypeError(`The ${file.slice(0, file.length - 3)} has no name !`);
                        client.commands.set(command.name, command);

                        //console.log(`Command ${file} loaded successfully !`);
                    }
                });
            });
            console.log(chalk.blue(`[Commands] ${cmdCount} Command(s) loaded successfully !`));

        } catch (err) {
            console.log(chalk.red(`[Commands] Something went wrong while loading commands...`), err);
        }
    }
}
