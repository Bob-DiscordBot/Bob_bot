const fs = require('fs');
const { connection } = require('mongoose');
const chalk = require('chalk');

module.exports = (client) => {
    client.handleEvents = async() => {

        try {
            let eventCount = 0;
            fs.readdirSync(`events`).forEach((folder) => {

                const eventFiles = fs.readdirSync(`events/${folder}`).filter((file) => file.endsWith('.js'));
                switch (folder) {
                    case "client":
                        eventFiles.forEach((file) => {
                            const data = fs.readFileSync(`./events/${folder}/${file}`, {encoding:'utf8', flag:'r'});
                            if (data.length > 0) {
                                eventCount++;

                                const event = require(`../../events/${folder}/${file}`);
                                if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                                else client.on(event.name, (...args) => event.execute(...args, client));
                            }
                        });
                        break;

                    case "database":
                        eventFiles.forEach((file) => {
                            const event = require(`../../events/${folder}/${file}`);
                            if (event.once) connection.once(event.name, (...args) => event.execute(...args, client));
                            else connection.on(event.name, (...args) => event.execute(...args, client));
                        });
                        break;
                    }
            });

            console.log(chalk.blue(`[Events] ${eventCount} Event(s) loaded successfully !`));

        } catch (err) {
            console.log(chalk.red(`[Events] Something went wrong while loading events...`), err);
        }
    }
}
