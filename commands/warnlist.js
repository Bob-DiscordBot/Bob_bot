const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'warnlist',
    description: 'Displays a member\'s warns',
    category: 'Moderation',
    permission: PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member to watch',
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser('member');
        if (!user) return message.reply('No member !');
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply('No member !');

        db.query(`SELECT * FROM warns WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            if (req.length < 1) return message.reply('This member has no warn !');
            await req.sort((a, b) => parseInt(a.date) - parseInt(b.date));

            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`${user.tag} warns`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: 'Warns' });

            for (let i = 0; i < req.length; i++) {
                Embed.addFields([
                    { name: `Warn N°${i+1}`, value: `> **Auteur** : ${(await bot.users.fetch(req[i].author)).tag}
                                                     > **ID** : \`${req[i].warn}\`
                                                     > **Reason** : \`${req[i].reason}\`
                                                     > **Date** : <t:${Math.floor(parseInt(req[i].date) / 1000)}:F>`
                    }
                ]);
            }

            await message.reply({ embeds: [Embed] });
        })
    }
}
