const chalk = require('chalk');

module.exports = {
    name: 'ping',
    description: 'Display latency.',
    category: 'General',
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
