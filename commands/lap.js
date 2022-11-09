const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const wait = require('node:timers/promises').setTimeout;

const player = createAudioPlayer();

module.exports = {
    name: 'lap',
    description: 'Lap',
    category: 'Administration',
    permission: PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member who will do a lap',
            required: true,
            autocomplete: false
        }, {
            type: 'number',
            name: 'number',
            description: 'Number of laps',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser('member');
        if (!user) return message.reply('No member');
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply('No member');

        let number = args.getNumber('number');
        if (!number) number = 1;
        if (parseInt(number) <= 0 || parseInt(number) > 20) return message.reply('Number must be between 1 - 20 :warning:');


        const category = bot.channels.cache.get('923251608580661278');
        const currChannel = bot.channels.cache.get(member.voice.channelId);

        let lapChannels = bot.channels.cache.filter(channel => channel.parentId === category.id).sort((a, b) => a.rawPosition - b.rawPosition);

        let connection;
        let subscribe;

        let test = [];

        const resources = [
            'audio\\tractor.mp3',
            'audio\\tractor.mp3',
            'audio\\tractor.mp3',
            'audio\\tractor.mp3',
            'audio\\tractor.mp3',
            'audio\\tractor.mp3',
            'audio\\tractor.mp3',
            'audio\\tractor.mp3',
            'audio\\tractor.mp3'
        ];

        await message.deferReply();

        try {
            lapChannels.forEach((channel) => {
                test.push(channel);
            });

            for (let i = 0; i < number; i++) {
                for (let j = 0; j < test.length; j++) {

                    await member.voice.setChannel(test[j].id);

                    connection = joinVoiceChannel({
                        channelId: test[j].id,
                        guildId: test[j].guild.id,
                        adapterCreator: test[j].guild.voiceAdapterCreator,
                    });

                    player.play(createAudioResource(resources[j]));

                    subscribe = connection.subscribe(player);

                    await wait(2500);

                    player.stop(true);
                }
            }

            connection.destroy();

            await member.voice.setChannel(currChannel.id);
            await message.editReply(`:traffic_light: ${member.user} did \`${number}\` ${number <= 1 ? 'lap' : 'laps'} ! :red_car:`);

        } catch (err) {
            if (subscribe)
                connection.destroy();

            await message.editReply(`:warning: Interruption of the lap ! :warning:`)
        }
    }
}
