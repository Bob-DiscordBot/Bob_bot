const Discord = require("discord.js");
const { ActivityType, ChannelType } = require("discord-api-types/v10");

module.exports = {
    name: 'roles',
    description: 'Get a list of server roles and member counts.',
    category: 'Information',
    permission: 'none',
    dm: false,

    async execute(interaction, client) {
        let roles = await interaction.guild.roles.cache.filter(role =>
            role.name !== "" && // Without empty name
            role.rawPosition >= 1 && // Without @everyone role
            !role.managed && // Without other bot roles
            !role.name.startsWith('-') && !role.name.endsWith('-') // Without Separator roles
        ).sort((a, b) => b.rawPosition - a.rawPosition);


        let Embed = new Discord.EmbedBuilder()
            .setTitle(`List of server roles (${roles.size})`)
            .setColor(client.color)
            .setTimestamp(Date.now())
            .setFooter({ text: `${client.user.username} © 2023` })

        roles.forEach((role) => {
            Embed.addFields({ name: `__**${role.name}**__`,
                                    value: `> Members : ${role.members.size/*interaction.guild.roles.get(role.id).members.size*/}` });
        })

        await interaction.reply({ embeds: [Embed] });
    }
}
