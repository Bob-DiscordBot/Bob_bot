const chalk = require('chalk');
const { PermissionFlagsBits, ButtonStyle} = require("discord-api-types/v10");
const Punishment = require('../../assets/schemas/punishment');
const {ButtonBuilder, ActionRowBuilder} = require("discord.js");

module.exports = {
    name: 'tempban',
    description: 'Temporary ban a member.',
    category: 'Moderation',
    permission: PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'Member to ban.',
            required: true,
            autocomplete: false
        }, {
            type: 'string',
            name: 'duration',
            description: 'Ban duration. (ex. 2d, 5h, 10m, ...)',
            required: true,
            autocomplete: false,
        }, {
            type: 'string',
            name: 'reason',
            description: 'Reason for ban.',
            required: false,
            autocomplete: false,
        }
    ],

    async execute(interaction, client, args) {

        try {
            let user = args.getUser('member');
            if (!user) return interaction.reply('No member to ban !');
            let member = interaction.guild.members.cache.get(user.id);

            let duration = args.getString('duration');
            if (!duration) return interaction.reply('No duration !');
            let time;
            let type;
            try {
                const split = duration.match(/\d+|\D+/g);
                time = parseInt(split[0]);
                type = split[1].toLowerCase();
            } catch (e) {
                return interaction.reply({ content : `Invalid time format ! Example format : \`10d\` where 'd' = days, 'h = hours and 'm' = minutes.`, ephemeral: true });
            }

            if (type === 'h') {
                time *= 60;
            } else if (type === 'd') {
                time *= 60 * 24;
            } else if (type !== 'm') {
                return interaction.reply({ content: `Please use 'm', 'h' or 'd' for minutes, jours and days respectively.`, ephemeral: true });
            }

            let reason = args.getString('reason');
            if (!reason) reason = `No reason.`;

            if (interaction.user.id === user.id) return interaction.reply(`Don't try to ban yourself !`);
            if ((await interaction.guild.fetchOwner()).id === user.id) return interaction.reply(`Why are you trying to ban the server owner ??`);
            if (member && !member?.bannable) return interaction.reply(`I can't ban this member !`);
            if (member && interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return interaction.reply(`You cannot ban this member !`);
            if ((await interaction.guild.bans.fetch()).get(user.id)) return interaction.reply(`This member is already banned !`);

            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + time);

            const result = await Punishment.findOne({
                guildId: interaction.guild.id,
                userId: member.id,
                type: 'ban',
            });

            if (result) {
                return interaction.reply(`<@${user.id}> is already banned from this server.`);
            }

            try {
                await user.send(`You have been temporary banned ${time} minutes from the **${interaction.guild.name}** server by ***${interaction.user.username}*** for the reason : \`${reason}\``);
            } catch (err) {}

            await interaction.reply(`${interaction.user} temporary banned \`${user.tag}\` ${time} minutes for the reason : \`${reason}\``);
            //await interaction.guild.bans.create(user.id, { reason: reason });

            await new Punishment({
                guildId: interaction.guild.id,

            })

        } catch (err) {
            console.log(err);
            return interaction.reply("No member to ban !");
        }
    }
}
