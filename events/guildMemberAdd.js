const Discord = require('discord.js');

module.exports = async (bot, member) => {

    let db = bot.db;
    db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {

        if (req.length < 1) return;

        // Check if Anti-Raid is activated.
        if (req[0].antiraid === 'true') {
            try { await member.user.send('You cannot join this server because it is in anti-raid mode !'); } catch (err) {}
            await member.kick('Active Anti-Raid');
            return;
        }

        // Check if Captcha is disabled.
        if (req[0].captcha === 'false') {
            await bot.function.welcome(bot, member);
            return;
        }

        // Check if the Captcha channel exist.
        let channel = member.guild.channels.cache.get(req[0].captcha);
        if (!channel) {
            await bot.function.welcome(bot, member);
            return;
        }

        // Add Overwrites permission to the new user.
        await channel.permissionOverwrites.create(member.user, {
            SendMessages : true,
            ViewChannel: true,
            ReadMessageHistory: true
        });

        // Generate the Captcha
        let captcha = await bot.function.generateCaptcha();
        let msg = await channel.send({ content: `${member}, you have 2 minutes to complete this captcha! If you don't pass it, you will be kicked out of the server !`,
                                       files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), { name: 'captcha.png' })]});

        try {
            let filter = m => m.author.id === member.user.id;
            let response = (await channel.awaitMessages({ filter, max: 1, time: 120000, errors: ['time']})).first();

            if (response.content === captcha.text) {
                await msg.delete();
                await response.delete();
                try { await member.user.send('You have passed the captcha !') } catch (err) {}
                channel.permissionOverwrites.delete(member.user.id);
                await bot.function.welcome(bot, member);

            } else {
                await msg.delete();
                await response.delete();
                try { await member.user.send('You failed the captcha !'); } catch (err) {}
                channel.permissionOverwrites.delete(member.user.id);
                await member.kick('Missed the captcha');
            }

        } catch (err) {
            await msg.delete();
            try { await member.user.send('You took too long to complete the captcha !'); } catch (err) {}
            channel.permissionOverwrites.delete(member.user.id);
            await member.kick('Didn\'t do the captcha');
        }
    });
}

