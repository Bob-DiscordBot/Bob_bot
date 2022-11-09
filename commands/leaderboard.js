const Discord = require('discord.js');
const Canvas = require('discord-canvas-easy');

module.exports = {
    name: 'leaderboard',
    description: 'Displays server experience ranking',
    category: 'Experience',
    permission: 'none',
    dm: false,
    options: [],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM experiences WHERE guild = '${message.guildId}'`, async (err, req) => {
            if (req.length < 1) return message.reply('Nobody has XP !');

            await message.deferReply();

            const calculXp = (xp, level) => {
                let xpTotal = 0;
                for (let i = 0; i < level + 1; i++) xpTotal += i * 1000;
                xpTotal += xp;
                return xpTotal;
            };

            let leaderboard = await req.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)));

            const Leaderboard = await new Canvas.Leaderboard()
                .setBot(bot)
                .setGuild(message.guild)
                .setBackground('https://i.pinimg.com/originals/ad/d2/ee/add2ee8f0723541d37239090e9a01b91.jpg')
                .setColorFont('#ffffff');

            for (let i = 0; i < (req.length > 10 ? 10 : req.length); i++) {
                await Leaderboard.addUser(await bot.users.fetch(leaderboard[i].user), parseInt(leaderboard[i].level), parseInt(leaderboard[i].xp), (parseInt(leaderboard[i].level) + 1) * 1000);
            }

            const Image = await Leaderboard.toLeaderboard();
            await message.followUp({ files: [new Discord.AttachmentBuilder(Image.toBuffer(), { name: 'leaderboard.png' })]});
        })
    }
}
