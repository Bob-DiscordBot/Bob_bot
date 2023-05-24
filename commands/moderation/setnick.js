const chalk = require('chalk');
const { PermissionFlagsBits } = require("discord-api-types/v10");

module.exports = {
    name: 'setnick',
    description: 'Changes the nickname of a member',
    category: 'Moderation',
    permission: PermissionFlagsBits.ManageNicknames,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'member',
            description: 'The user to rename.',
            required: true,
            autocomplete: false,
        }, {
            type: 'string',
            name: 'name',
            description: 'The new username.',
            required: true,
            autocomplete: false,
        }
    ],

    async execute(interaction, client, args) {

        try {
            let user = args.getUser('member');
            if (!user) return interaction.reply('No member to rename !');
            let member = interaction.guild.members.cache.get(user.id);

            let newName = args.getString('name');
            if (!newName) return interaction.reply('Please set a new username !');

            if ((await interaction.guild.fetchOwner()).id === user.id) return interaction.reply("Why are you trying to rename the server owner ??");
            if (member && interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return interaction.reply("You cannot rename this member !");

            let oldName = member.nickname;
            await member.setNickname(newName);
            await interaction.reply(`${interaction.user} renamed the user \`${oldName}\` to ${member}`);

        } catch (err) {
            console.log(err)
            return interaction.reply("No member to rename !");
        }
    }
}
