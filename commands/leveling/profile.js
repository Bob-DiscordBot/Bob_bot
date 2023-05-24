const chalk = require('chalk');

module.exports = {
    name: 'profile',
    description: 'View your or someone else\'s customizable personal global profile card',
    category: 'Leveling',
    permission: 'none',
    dm: true,

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency : ${client.ws.ping} ms\nClient Ping : ${message.createdTimestamp - interaction.createdTimestamp} ms`;
        await interaction.editReply({
            content: newMessage
        });
    }
}
