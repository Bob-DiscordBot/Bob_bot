const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: 'clear',
    description: 'Clear a channel',
    category: 'Moderation',
    permission: PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {
            type: 'number',
            name: 'number',
            description: 'Number of messages to delete (1 - 100)',
            required: true,
            autocomplete: false
        }, {
            type: 'channel',
            name: 'channel',
            description: 'Channel where to clear messages',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let number = args.getNumber('number');
        if (parseInt(number) <= 0 || parseInt(number) > 100) return message.reply('Number must be between 1 - 100 :warning:');

        let channel = args.getChannel('channel');
        if (!channel) channel = message.channel;
        if (channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply('No channel !');

        await message.deferReply();

        try {
            let messages = await channel.bulkDelete(parseInt(number));
            await message.editReply({ content: `Bot cleared \`${messages.size}\` ${messages.size <= 1 ? 'message' : 'messages'} in the ${channel} channel !  :broom:`, ephemeral: true });

        } catch (err) {
            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()];

            if (messages.length <= 0) {
                await message.editReply('No messages have been deleted because they are all over 14 days old !');

            } else {
                await channel.bulkDelete(messages);
                await message.editReply(`Bot was able to delete only \`${messages.length}\` ${messages.length <= 1 ? 'message' : 'messages'} in the ${channel} channel because the others are more than 14 days old !  :broom:`);
            }
        }

        await wait(7000);
        await message.deleteReply();
    }
}
