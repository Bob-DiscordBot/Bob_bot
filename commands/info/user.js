const Discord = require("discord.js");
const { ActivityType } = require("discord-api-types/v10");

module.exports = {
    name: 'user',
    description: 'Shows information about yourself or a user.',
    category: 'Information',
    permission: 'none',
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'The user to display',
            required: false,
            autocomplete: false,
        },
    ],

    async execute(interaction, client, args) {
        let user = args.getUser('member');
        if (args.getUser('member')) {
            user = args.getUser('member');
            if (!user || !interaction.guild.members.cache.get(user?.id)) return interaction.reply('No member !');

        } else {
            user = interaction.user;
        }

        let member = interaction.guild.members.cache.get(user.id);
        let infos = {
            user: user,
            username: user.username,
            discriminator: user.discriminator,
            id: user.id,
            bot: user.bot ? "Yes" : "No",
            status: member.presence?.status,
            flags: user.bot ? "None" : user.flags.toArray().length || (await user.fetchFlags()).toArray().length,
            custom: member.presence?.activities.find(a => a.type === ActivityType.Custom)?.state || "None",
            activity: user.bot ? "None" : member.presence?.activities.filter(a => a.type !== ActivityType.Custom),
            platform: member.presence?.clientStatus,
            account: member.user.createdAt.toUTCString(),
            nickname: member.nickname || "None",
            arrival: new Date(parseInt(member.joinedTimestamp.toString().slice(0, 10)) * 1000).toUTCString(),
            highest: member.roles.highest,
            color: (await member.user.fetch()).accentColor ? (await member.user.fetch()).accentColor : member.displayColor,
        }

        let cliStatus = member.presence?.clientStatus;
        if (cliStatus.web !== undefined) infos.platform = "Web";
        else if (cliStatus.desktop !== undefined) infos.platform = "Desktop";
        else if (cliStatus.mobile !== undefined) infos.platform = "Mobile";
        else infos.platform = "Unknown";

        let Embed = new Discord.EmbedBuilder()
            .setTitle(`Information about the user ${user.tag}`)
            .setColor(infos.color)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields({ name: `__**User Information**__`,
                value: `> **Name** : \`${infos.username}\` ${infos.user}
                        > **Tag** : \`${infos.discriminator}\`
                        > **Id** : \`${infos.id}\`
                        > **Bot** : \`${infos.bot}\`
                        > **Status** : \`${infos.status}\`
                        > **Flags** : \`${infos.flags}\`
                        > **Custom Status** : \`${infos.custom}\`
                        > **Activity** : \`${infos.activity}\`
                        > **Connection platform** : \`${infos.platform}\`
                        > **Account creation date** : \`${infos.account}\`` })
            .addFields({ name: `__**Member Information**__`,
                value: `> **Nickname** : \`${infos.nickname}\`
                        > **Arrival date** : \`${infos.arrival}\`
                        > **Highest role** : ${infos.highest}` })
            .setImage((await member.user.fetch()).bannerURL({ size: 4096, forceStatic: true }))
            .setTimestamp(Date.now())
            .setFooter({ text: `${client.user.username} © 2023` })

        await interaction.reply({ embeds: [Embed] });
    }
}
