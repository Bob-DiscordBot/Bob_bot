const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays bot commands',
    category: 'Information',
    permission: 'none',
    dm: true,
    options: [
        {
            type: 'string',
            name: 'command',
            description: 'The command to display',
            required: false
        }
    ],

    async run(bot, message, args) {

        let command;
        if (args.getString('command')) {
            command = bot.commands.get(args.getString('command'));
            if (!command) return message.reply('No command found !');
        }

        if (!command) {
            let categories = [];
            bot.commands.forEach(command => {
                if (!categories.includes(command.category)) categories.push(command.category);
            })

            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Bot commands`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Commands available : \`${bot.commands.size}\`\nCategories available : \`${categories.length}\``)
                .setTimestamp()
                .setFooter({ text: 'Bot commands' });

            await categories.sort().forEach((cat) => {
                let commands = bot.commands.filter(cmd => cmd.category === cat);
                Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join('\n')}` });
            })

            await message.reply({ embeds: [Embed] });

        } else {
            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Commands ${command.name}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Name : \`${command.name}\`\n
                                 Description : \`${command.description}\`\n
                                 Permissions : \`${typeof command.permission !== 'bigint' ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\n
                                 DM commands : \`${command.dm ? 'Yes' : 'No'}\`\n
                                 Category : \`${command.category}\``)
                .setTimestamp()
                .setFooter({ text: 'Bot commands' });

            await message.reply({ embeds: [Embed] });
        }
    }
}
