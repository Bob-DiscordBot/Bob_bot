const chalk = require('chalk');
const { ButtonBuilder, ActionRowBuilder} = require("discord.js");
const { ButtonStyle } = require("discord-api-types/v10");

module.exports = {
    name: 'vote',
    description: 'Get the vote link and see when you can vote again.',
    category: 'General',
    permission: 'none',
    dm: true,

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const vote = new ButtonBuilder()
            .setLabel('Vote link')
            .setURL('https://chengae.dev/accueil/')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(vote);

        const newMessage = `🎉 Vous pouvez voter pour le bot !`;
        await interaction.editReply({
            content: newMessage,
            components: [ row ]
        });
    }
}
