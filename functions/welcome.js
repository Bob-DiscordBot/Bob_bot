const Discord = require('discord.js');

module.exports = async (bot, member) => {

    let db = bot.db;
    db.query(`SELECT * FROM welcome WHERE guild = '${member.guild.id}'`, async (err, req) => {
        let channel = member.guild.channels.cache.get(req[0].channel);
        if (channel) {
            const Embed = new Discord.EmbedBuilder()
                .setTitle('New member !')
                .setDescription('Bienvenue **' + member.user.username + '** sur le serveur **' + member.guild.name + '** !\n\n Nous espérons que tu passeras un bon moment parmis nous :)')
                .setColor('Green')
                .setThumbnail(member.user.displayAvatarURL())
                .setImage('https://cdn.discordapp.com/attachments/701874016897728563/1034823266847694868/welcome.gif')
                .addFields(
                    {
                        name: 'Règlement',
                        value: 'N\'oublie pas d\'aller lire le règlement !'
                    }
                )
                .setTimestamp(Date.now())
                .setFooter({
                    iconURL: member.client.user.displayAvatarURL(),
                    text: member.client.user.username
                });

            try { await channel.send({ embeds: [Embed] }); } catch (err) {}
        }

        let role = member.guild.roles.cache.get(req[0].role);
        if (role) {
            try { await member.roles.add(role) } catch (err) {}
        }
    });
}
