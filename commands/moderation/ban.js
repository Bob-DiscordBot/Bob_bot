const chalk = require('chalk');
const { PermissionFlagsBits, ButtonStyle} = require("discord-api-types/v10");
const {ButtonBuilder, ActionRowBuilder} = require("discord.js");

module.exports = {
    name: 'ban',
    description: 'Ban a member.',
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
            name: 'reason',
            description: 'Reason for ban.',
            required: false,
            autocomplete: false
        }
    ],

    async execute(interaction, client, args) {

        try {
            let user = args.getUser('member');
            if (!user) return interaction.reply('No member to ban !');
            let member = interaction.guild.members.cache.get(user.id);

            let reason = args.getString('reason');
            if (!reason) reason = `No reason.`;

            if (interaction.user.id === user.id) return interaction.reply(`Don't try to ban yourself !`);
            if ((await interaction.guild.fetchOwner()).id === user.id) return interaction.reply(`Why are you trying to ban the server owner ??`);
            if (member && !member?.bannable) return interaction.reply(`I can't ban this member !`);
            if (member && interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return interaction.reply(`You cannot ban this member !`);
            if ((await interaction.guild.bans.fetch()).get(user.id)) return interaction.reply(`This member is already banned !`);

            try {
                await user.send(`You have been banned from the **${interaction.guild.name}** server by ***${interaction.user.username}*** for the reason : \`${reason}\``);
            } catch (err) {}

            await interaction.reply(`${interaction.user} banned \`${user.tag}\` for the reason : \`${reason}\``);
            await interaction.guild.bans.create(user.id, { reason: reason });

            /*
            const confirm = new ButtonBuilder()
                .setCustomId('confirm_ban')
                .setLabel('Confirm Ban')
                .setStyle(ButtonStyle.Danger);

            const cancel = new ButtonBuilder()
                .setCustomId('cancel_ban')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Secondary);

            const row = new ActionRowBuilder()
                .addComponents(cancel, confirm);

            await interaction.reply({
                content: `Are you sure you want to ban ${member} for reason: \`${reason}\` ?`,
                components: [row],
            });
            /**/

        } catch (err) {
            console.log(err);
            return interaction.reply("No member to ban !");
        }
    }
}
