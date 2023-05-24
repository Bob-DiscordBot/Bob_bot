const Guild = require('../../assets/schemas/guild');
const Option = require('../../assets/schemas/option');
const Level = require('../../assets/schemas/level');

module.exports = {
    name: 'messageCreate',
    async execute(interaction, client){
        console.log(`[Event] ${this.name}`);

        // Verify if Guild is in DataBase, if not : add them, if exist : update data
        let guildProfile = await Guild.findOne({ guildId: interaction.guildId });
        if (!guildProfile) {
            guildProfile = await new Guild({
                guildId: interaction.guildId,
                guildName: interaction.guild.name,
                guildIcon: interaction.guild.icon ? interaction.guild.icon : 'none'
            });

            await guildProfile.save().catch(console.error);

        } else {
            if (guildProfile.guildName !== interaction.guild.name) guildProfile.guildName = interaction.guild.name;
            if (guildProfile.guildIcon !== interaction.guild.icon) guildProfile.guildIcon = interaction.guild.icon ? interaction.guild.icon : 'none';
            await guildProfile.save().catch(console.error);
        }

        // Add / Update guild options on database
        let guildOptions = await Option.findOne({ guildId: interaction.guildId });
        if (!guildOptions) {
            guildOptions = await new Option({
                guildId: interaction.guildId,
                language: 'eng'
            });

            await guildOptions.save().catch(console.error);
        }

        // User leveling
        /*
        if (!interaction.author.bot) {
            let userLevel = await Level.findOne({ guildId: interaction.guildId, userId: interaction.author.id });
            if (!userLevel) {
                userLevel = await new Level({
                    guildId: interaction.guildId,
                    userId: interaction.author.id,
                    xp: (Math.floor(Math.random() * 25 ) + 1),
                    level: 0,
                });

                await userLevel.save().catch(console.error);
                console.log("User Level :", userLevel);

            } else {
                if ((userLevel.level + 1) * 1000 <= userLevel.xp) {
                    userLevel.xp = (userLevel.xp - ((userLevel.level + 1) * 1000));
                    userLevel.level = (userLevel.level + 1);

                } else {
                    userLevel.xp = userLevel.xp + (Math.floor(Math.random() * 25 ) + 1);
                }

                await userLevel.save().catch(console.error);
                console.log("User Level :", userLevel);
            }
        }
        /**/


    }
}
