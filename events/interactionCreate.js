const Discord = require('discord.js');
const { InteractionType } = require('discord.js');

module.exports = async (bot, interaction) => {

    if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
        let entry = interaction.options.getFocused();

        if (interaction.commandName === 'help') {
            let choices = bot.commands.filter(cmd => cmd.name.includes(entry));
            await interaction.respond(entry === '' ? bot.commands.map(cmd => ({ name: cmd.name, value: cmd.name })) : choices.map(choice => ({ name: choice.name, value: choice.name })));
        }

        if (interaction.commandName === 'setcaptcha' || interaction.commandName === 'setantiraid') {
            let choices = ['on', 'off'];
            let output = choices.filter(c => c.includes(entry));
            await interaction.respond(entry === '' ? output.map(c => ({ name: c, value: c })) : output.map(c => ({ name: c, value: c })));
        }
    }

    if (interaction.type === InteractionType.ApplicationCommand) {
        let command = require(`../commands/${interaction.commandName}`);
        command.run(bot, interaction, interaction.options, bot.db);
    }
}

