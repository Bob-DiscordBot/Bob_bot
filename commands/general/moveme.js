const chalk = require('chalk');
const { ChannelType } = require("discord-api-types/v10");

module.exports = {
    name: 'moveme',
    description: 'Moves you to another voice channel.',
    category: 'General',
    permission: 'none',
    dm: false,
    options: [
        {
            type: 'channel',
            name: 'channel',
            description: 'The desired channel',
            channelType: ChannelType.GuildVoice,
            required: true,
            autocomplete: false,
        }
    ],

    async execute(interaction, client, args) {
        let channel = args.getChannel('channel');
        if (!channel) return interaction.reply({ content: 'No voice channel !', ephemeral: true });
        let member = interaction.guild.members.cache.get(interaction.user.id);
        if (!member) return interaction.reply({ content: 'No member !', ephemeral: true });

        if (!client.channels.cache.get(member.voice.channelId)) return interaction.reply({ content: 'You are not in any voice channel !' , ephemeral: true });
        if (member.voice.channelId === channel.id) return interaction.reply({ content: `You are already in the ${channel} voice channel !`, ephemeral: true });

        await member.voice.setChannel(channel.id);
        await interaction.reply({
            content: `You have been moved in the channel ${channel} !`,
            ephemeral: true,
        });
    }
}
