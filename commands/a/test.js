const chalk = require('chalk');

module.exports = {
    name: 'test',
    description: 'Test Command.',
    category: 'A',
    permission: 'none',
    dm: true,
    options: [
        {
            type: 'channel',
            name: 'channel',
            description: 'The voice Channel',
            required: false,
            autocomplete: false,
        }
    ],

    async execute(interaction, client) {
        await interaction.reply("Test !");

        let choices = [];
        interaction.guild.channels.cache.forEach(channel => {
            if (channel.isVoiceBased()) choices.push({ name: channel.name, id: channel.id });
        });
        //let test = client.commands.filter(cmd => cmd.name.includes(focusedOption.value));
        console.log("Choices :", choices);
    }
}
