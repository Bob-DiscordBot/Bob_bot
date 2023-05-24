const Guild = require('../../assets/schemas/guild');
const Option = require('../../assets/schemas/option');

module.exports = {
    name: 'guildCreate',
    async execute(guild, client){
        console.log(`[Event] ${this.name}`);

        // Add / Update guild on database
        let guildProfile = await Guild.findOne({ guildId: guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                guildId: guild.id,
                guildName: guild.name,
                guildIcon: guild.iconURL() ? guild.guild.iconURL() : 'none'
            });

            await guildProfile.save().catch(console.error);
            console.log(guildProfile);

        } else {
            if (guildProfile.guildName !== guild.name) guildProfile.guildName = guild.name;
            if (guildProfile.guildIcon !== guild.iconURL) guildProfile.guildIcon = guild.iconURL() ? guild.guild.iconURL() : 'none';
            await guildProfile.save().catch(console.error);
            console.log(guildProfile);
        }

        // Add / Update guild options on database
        let guildOptions = await Option.findOne({ guildId: guild.id });
        if (!guildOptions) {
            guildOptions = await new Option({
                guildId: guild.id,
                language: 'eng'
            });

            await guildOptions.save().catch(console.error);
            console.log(guildOptions);
        }
    }
}
