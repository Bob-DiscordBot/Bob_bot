const Discord = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require("@discordjs/voice");

module.exports = {
    name: 'test',
    description: 'Test',
    category: 'Information',
    permission: 'none',
    dm: true,

    async run(bot, message) {

        const channel = bot.channels.cache.get('916805853330436122');

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const resource = createAudioResource('.\\tractor.mp3');

        const player = createAudioPlayer();
        connection.subscribe(player)

        player.play(resource)

        await message.reply(`Tractor !`);
         /* */
    }
}
