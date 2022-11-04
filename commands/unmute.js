const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Unmute a member',
    category: 'Moderation',
    permission: PermissionFlagsBits.ModerateMemebrs,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member to unmute',
            required: true
        }, {
            type: 'string',
            name: 'reason',
            description: 'Unmute reason',
            required: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser('member');
        if (!user) return message.reply('No member !');
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply('No member !');

        let reason = args.getString('reason');
        if (!reason) reason = 'No reason.';

        if (member && !member?.moderatable) return message.reply('I can\'t unmute this member !');
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('You cannot unmute this member !');
        if (!member.isCommunicationDisabled()) return message.reply('This member is already unmuted !');

        try {
            await user.send(`You have been unmuted from the ${message.guild.name} server by ${message.user.name} for the reason : \`${reason}\``);
        } catch (err) {}

        await message.reply(`${message.user} unmuted ${user.tag} for the reason : \`${reason}\``);
        await member.timeout(null, reason);
    }
}
