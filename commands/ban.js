const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a member',
    category: 'Moderation',
    permission: PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member to ban',
            required: true
        }, {
            type: 'string',
            name: 'reason',
            description: 'Reason for ban',
            required: false
        }
    ],

    async run(bot, message, args) {

        try {
            let user = args.getUser('member');
            if (!user) return message.reply('No member to ban !');
            let member = message.guild.members.cache.get(user.id);

            let reason = args.getString('reason');
            if (!reason) reason = 'No reason.';

            if (message.user.id === user.id) return message.reply('Don\'t try to ban yourself !');
            if ((await message.guild.fetchOwner()).id === user.id) return message.reply('Why are you trying to ban the server owner ??');
            if (member && !member?.bannable) return message.reply('I can\'t ban this member !');
            if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('You cannot ban this member !');
            if ((await message.guild.bans.fetch()).get(user.id)) return message.reply('This member is already banned !');

            try {
                await user.send(`You have been banned from the ${message.guild.name} server by ${message.user.name} for the reason : \`${reason}\``);
            } catch (err) {}

            await message.reply(`${message.user} banned ${user.tag} for the reason : \`${reason}\``);
            await message.guild.bans.create(user.id, { reason : reason });

        } catch (err) {
            return message.reply('No member to ban !');
        }
    }
}
