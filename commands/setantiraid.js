const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'setantiraid',
    description: 'Set the anti-raid',
    category: 'Administration',
    permission: PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [
        {
            type: 'string',
            name: 'stat',
            description: 'Anti-raid status (on or off)',
            required: true,
            autocomplete: true
        }
    ],

    async run(bot, message, args, db) {

        let stat = args.getString('stat');
        if (stat !== 'on' && stat !== 'off') return message.reply('Indicate on or off');

        if (stat === 'off') {
            db.query(`UPDATE server SET antiraid = 'false' WHERE guild = '${message.guildId}'`);
            await message.reply('The anti-raid is disabled !');

        } else {
            db.query(`UPDATE server SET antiraid = 'true' WHERE guild = '${message.guildId}'`);
            await message.reply(`The anti-raid is activated !`);
        }
    }
}
