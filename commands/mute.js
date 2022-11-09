const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Mute a member',
    category: 'Moderation',
    permission: PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member to mute',
            required: true,
            autocomplete: false
        }, {
            type: 'string',
            name: 'time',
            description: 'Mute time',
            required: true,
            autocomplete: false
        }, {
            type: 'string',
            name: 'reason',
            description: 'Reason for mute',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser('member');
        if (!user) return message.reply('No member !');
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply('No member !');

        let time = args.getString('time');
        if (!time) return message.reply('No time !');
        if (isNaN(ms(time))) return message.reply('Wrong format !');
        if (ms(time) > 2419200000) return message.reply('The mute cannot last longer than 28 days !');

        let reason = args.getString('reason');
        if (!reason) reason = 'No reason.';

        if (message.user.id === user.id) return message.reply('Don\'t try to mute yourself !');
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply('Why are you trying to mute the server owner ??');
        if (member && !member?.moderatable) return message.reply('I can\'t mute this member !');
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('You cannot mute this member !');
        if (member.isCommunicationDisabled()) return message.reply('This member is already muted !');

        try {
            await user.send(`You have been muted from the ${message.guild.name} server by ${message.user.username} for ${time} for the reason : \`${reason}\``);
        } catch (err) {}

        await message.reply(`${message.user} muted ${user} for ${time} for the reason : \`${reason}\``);
        await member.timeout(ms(time), `${reason}`);
    }
}
