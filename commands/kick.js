const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a member',
    category: 'Moderation',
    permission: PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member to kick',
            required: true
        }, {
            type: 'string',
            name: 'reason',
            description: 'Reason for kick',
            required: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser('member');
        if (!user) return message.reply('No member to kick !');
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply('No member to kick !');

        let reason = args.getString('reason');
        if (!reason) reason = 'No reason.';

        if (message.user.id === user.id) return message.reply('Don\'t try to kick yourself !');
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply('Why are you trying to kick the server owner ??');
        if (member && !member?.kickable) return message.reply('I can\'t kick this member !');
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('You cannot kick this member !');
        if ((await message.guild.bans.fetch()).get(user.id)) return message.reply('This member is already kicked !');

        try {
            await user.send(`You have been kicked from the ${message.guild.name} server by ${message.user.name} for the reason : \`${reason}\``);
        } catch (err) {}

        await message.reply(`${message.user} kicked ${user.tag} for the reason : \`${reason}\``);
        await member.kick(reason);
    }
}
