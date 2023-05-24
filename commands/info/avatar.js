const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    description: 'Get a user\'s avatar.',
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
        let color = (await member.user.fetch()).accentColor ? (await member.user.fetch()).accentColor : member.displayColor;

        let Embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle("Avatar URL")
            .setURL(`${user.avatarURL()}?size=1024`)
            .setImage(user.avatarURL({ size: 512 }))
            .setTimestamp(Date.now())
            .setFooter({ text: `${client.user.username} © 2023` })

        await interaction.reply({ embeds: [Embed] });
    }
}
