const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const chalk = require("chalk");

module.exports = (client) => {
    client.handleSlashCommands = async() => {
        try {
            let commands = [];

            client.commands.forEach((command) => {

                let slashCommand = new Discord.SlashCommandBuilder()
                    .setName(command.name)
                    .setDescription(command.description)
                    .setDMPermission(command.dm)
                    .setDefaultMemberPermissions(command.permission === 'none' ? null : command.permission);

                if (command.options?.length >= 1) {
                    for (let i = 0; i < command.options.length; i++) {
                        if (command.options[i].type === 'string') {
                            slashCommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option
                                .setName(command.options[i].name)
                                .setDescription(command.options[i].description)
                                .setAutocomplete(command.options[i].autocomplete)
                                .setRequired(command.options[i].required)
                            );

                        } else if (command.options[i].type === 'channel' && command.options[i].channelType) {
                            slashCommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option
                                .setName(command.options[i].name)
                                .setDescription(command.options[i].description)
                                .setRequired(command.options[i].required)
                                .addChannelTypes(command.options[i].channelType)
                            );

                        } else {
                            slashCommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option
                                .setName(command.options[i].name)
                                .setDescription(command.options[i].description)
                                .setRequired(command.options[i].required)
                            );
                        }
                    }
                }

                commands.push(slashCommand);
            });

            const rest = new REST({ version: '10' }).setToken(client.config.BOT_token);

            await rest.put(Routes.applicationCommands(client.user.id), { body: commands });

            console.log(chalk.blue('[Slash CMD] Create successfully !'));

        } catch (err) {
            console.log(chalk.red(`[Slash CMD] Something went wrong while loading slash commands...`), err);
        }

    }
}
