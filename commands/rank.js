const Discord = require('discord.js');
const Canvas = require('discord-canvas-easy');

module.exports = {
    name: 'rank',
    description: 'Shows a member\'s XP',
    category: 'Experience',
    permission: 'none',
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member\'s XP to view',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user;
        if (args.getUser('member')) {
            user = args.getUser('member');
            if (!user || !message.guild.members.cache.get(user?.id)) return message.reply('No member !');

        } else {
            user = message.user;
        }

        db.query(`SELECT * FROM experiences WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            db.query(`SELECT * FROM experiences WHERE guild = '${message.guildId}'`, async (err, all) => {
                if (req.length < 1) return message.reply('This member has no XP !');

                await message.deferReply();

                const calculXp = (xp, level) => {
                    let xpTotal = 0;
                    for (let i = 0; i < level + 1; i++) xpTotal += i * 1000;
                    xpTotal += xp;
                    return xpTotal;
                };

                let leaderboard = await all.sort(async (a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)));
                let xp = parseInt(req[0].xp);
                let level = parseInt(req[0].level);
                let rank = leaderboard.findIndex(r => r.user === user.id) + 1;
                let need = (level + 1) * 1000;

                let Card = await new Canvas.Card()
                    .setBackground('https://i.pinimg.com/originals/ad/d2/ee/add2ee8f0723541d37239090e9a01b91.jpg')
                    .setBot(bot)
                    .setColorFont('#ffffff')
                    .setRank(rank)
                    .setUser(user)
                    .setColorProgressBar('#ff0000')
                    .setGuild(message.guild)
                    .setXp(xp)
                    .setLevel(level)
                    .setXpNeed(need)
                    .toCard();

                await message.followUp({ files: [new Discord.AttachmentBuilder(Card.toBuffer(), { name: 'rank.png' })]});
            })
        })
    }
}
