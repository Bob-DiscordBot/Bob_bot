const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays client commands.',
    category: 'General',
    permission: 'none',
    dm: true,
    options: [
        {
            type: 'string',
            name: 'command',
            description: 'The command to display',
            required: false,
            autocomplete: true
        }
    ],

    async execute(interaction, client, args) {
        //console.log("i:", interaction)
        //console.log("c:", client)
        //console.log("a:", args)

        let command;
        if (args.getString('command')) {
            command = client.commands.get(args.getString('command'));
            if (!command) return interaction.reply('No command found !');
        }

        if (!command) {
            let categories = [];
            client.commands.forEach(command => {
                if (!categories.includes(command.category)) categories.push(command.category);
            })

            let Embed = new Discord.EmbedBuilder()
                .setTitle(`All commands`)
                .setDescription(`Categories available : \`${categories.length}\`\nCommands available : \`${client.commands.size}\``)
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp(Date.now())
                .setFooter({ text: `${client.user.username} © 2023` })

            await categories.sort().forEach((categorie) => {
                let commands = client.commands.filter(cmd => cmd.category === categorie);
                Embed.addFields({ name: `${categorie}`, value: `${commands.map(cmd => `> \`${cmd.name}\` : ${cmd.description}`).join('\n')}` });
            })

            await interaction.reply({ embeds: [Embed] });

        } else {
            let Embed = new Discord.EmbedBuilder()
                .setTitle(`Commands ${command.name}`)
                .setDescription(`Name : \`${command.name}\`
                                 Description : \`${ command.description }\`
                                 Permissions : \`${ typeof command.permission !== 'bigint' ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false) }\`
                                 DM commands : \`${ command.dm ? 'Yes' : 'No' }\`
                                 Category : \`${ command.category }\``)
                .setColor(client.color)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp(Date.now())
                .setFooter({ text: `${client.user.username} © 2023` })

            await interaction.reply({ embeds: [Embed] });
        }
    }
}
