const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'setcaptcha',
    description: 'Set the captcha',
    category: 'Administration',
    permission: PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [
        {
            type: 'string',
            name: 'stat',
            description: 'Captcha status (on or off)',
            required: true,
            autocomplete: true
        }, {
            type: 'channel',
            name: 'channel',
            description: 'Captcha channel (filled in if on)',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let stat = args.getString('stat');
        if (stat !== 'on' && stat !== 'off') return message.reply('Indicate on or off');

        if (stat === 'off') {
            db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`);
            await message.reply('The captcha is disabled !');

        } else {
            let channel =  args.getChannel('channel');
            if (!channel) return message.reply('Indicate a channel to activate the captcha !');
            channel = message.guild.channels.cache.get(channel.id);
            if (!channel) return message.reply('No channel found !');

            db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`);
            await message.reply(`The captcha is activated in the channel ${channel} !`);
        }
    }
}
