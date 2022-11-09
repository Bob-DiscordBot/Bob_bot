const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a member',
    category: 'Moderation',
    permission: PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'user',
            description: 'User to unban',
            required: true,
            autocomplete: false
        }, {
            type: 'string',
            name: 'reason',
            description: 'Unban reason',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {
            let user = args.getUser('user');
            if (!user) return message.reply('No user to unban !');

            let reason = args.getString('reason');
            if (!reason) reason = 'No reason.';

            if (!(await message.guild.bans.fetch()).get(user.id)) return message.reply('This user is not banned !');

            try {
                await user.send(`You have been unbanned from the ${message.guild.name} server by ${message.user.name} for the reason : \`${reason}\``);
            } catch (err) {}

            await message.reply(`${message.user} unbanned ${user.tag} for the reason : \`${reason}\``);
            await message.guild.members.unban(user.id, reason);

        } catch (err) {
            return message.reply('No user to unban !');
        }
    }
}
