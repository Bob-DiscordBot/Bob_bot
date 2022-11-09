const Discord = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'setwelcome',
    description: 'Set the welcome channel and role',
    category: 'Administration',
    permission: PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [
        {
            type: 'channel',
            name: 'channel',
            description: 'Welcome channel (filled in if on)',
            required: false,
            autocomplete: false
        }, {
            type: 'role',
            name: 'role',
            description: 'Welcome role (filled in if on)',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let channel = args.getChannel('channel');
        let role = args.getRole('role');
        let msg;

        if (channel) {
            db.query(`UPDATE welcome SET channel = '${channel.id}' WHERE guild = '${message.guildId}'`);
            msg = `The welcome message is \`activated\` in the channel ${channel}`;

        } else {
            db.query(`UPDATE welcome SET channel = 'false' WHERE guild = '${message.guildId}'`);
            msg = `The welcome message is \`disabled\``;
        }

        if (role) {
            db.query(`UPDATE welcome SET role = '${role.id}' WHERE guild = '${message.guildId}'`);
            msg += ` and the auto-role is \`activated\` and gives the role ${role} !`;

        } else {
            db.query(`UPDATE welcome SET role = 'false' WHERE guild = '${message.guildId}'`);
            msg += ` and the auto-role is \`disabled\` !`;
        }

        await message.reply(msg);
    }
}
