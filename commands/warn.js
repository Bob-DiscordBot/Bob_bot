const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'warn',
    description: 'Warn a member',
    category: 'Moderation',
    permission: PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member to warn',
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

    async run(bot, message, args, db) {

        let user = args.getUser('member');
        if (!user) return message.reply('No member !');
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply('No member !');

        let reason = args.getString('reason');
        if (!reason) reason = 'No reason.';

        if (message.user.id === user.id) return message.reply('Don\'t try to warn yourself !');
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply('Why are you trying to warn the server owner ??');
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('You cannot warn this member !');
        if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('The bot cannot warn this member !');

        try {
            await user.send(`You have been warned from the **${message.guild.name}** server by ${message.user.name} for the reason : \`${reason}\``);
        } catch (err) {}

        await message.reply(`${message.user} warned ${user} for the reason : \`${reason}\``);

        let ID = await bot.function.createId('WARN');
        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`);
    }
}
