const Discord = require("discord.js");
const { ActivityType, ChannelType } = require("discord-api-types/v10");

module.exports = {
    name: 'server',
    description: 'Shows information about the server.',
    category: 'Information',
    permission: 'none',
    dm: false,

    async execute(interaction, client) {
        let server = interaction.guild;
        let members = {
            total: server.members.cache.filter(m => m.user.bot === false).size,
            online: server.members.cache.filter(m => server.members.cache.get(m.user.id).presence && m.user.bot === false).size,
            boost: server.members.cache.filter(m => server.members.cache.get(m.user.id).presence && m.premiumSinceTimestamp && m.user.bot === false).size,
        }
        let channels = {
            total: server.channels.cache.filter(c => c.type !== ChannelType.GuildCategory).size,
            text: server.channels.cache.filter(c => c.type === ChannelType.GuildText).size + server.channels.cache.filter(c => c.type === ChannelType.GuildAnnouncement).size + server.channels.cache.filter(c => c.type === ChannelType.GuildForum).size,
            voice: server.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size + server.channels.cache.filter(c => c.type === ChannelType.GuildStageVoice).size,
        }
        let infos = [
            { icon: `:id:`, name: `Server id` , value: server.name },
            { icon: `:calendar:`, name: `Created at` , value: server.createdAt.toDateString() },
            { icon: `:crown:`, name: `Owned by` , value: interaction.guild.members.cache.get(server.ownerId) },
            { icon: `:busts_in_silhouette:`, name: `Members (${members.total})` , value: `**${members.online}** Online\n **${members.boost}** Booster :sparkles:` },
            { icon: `:speech_balloon:`, name: `Channels (${channels.total})` , value: `**${channels.text}** Text\n **${channels.voice}** Voice` },
            { icon: `:closed_lock_with_key:`, name: `Roles (${server.roles.cache.size})` , value: `Use cmd\n\`/roles\`` },
        ]

        console.log(server)

        let Embed = new Discord.EmbedBuilder()
            .setTitle(`Information about the server \`${server.name}\``)
            .setColor(client.color)
            .setTimestamp(Date.now())
            .setFooter({ text: `${client.user.username} © 2023` })

        await infos.forEach((info) => {
            Embed.addFields({ name: `${info.icon ? info.icon + " " : ""}${info.name}`,
                                    value: `${info.link ? "[" : ""}${info.value}${info.link ? "](" + info.link + ")" : ""}`,
                                    inline: true });
        })

        await interaction.reply({ embeds: [Embed] });
    }
}
