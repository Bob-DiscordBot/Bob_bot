const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client){
        console.log(`[Event] ${this.name}`);

        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if (!command) return interaction.reply({
                content: `Command \`${commandName}\` not found...`,
                ephemeral: true,
            });

            try {
                await command.execute(interaction, client, interaction.options);

            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Something went wrong while executing this command...`,
                    ephemeral: true,
                });
            }

        //} else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
        } else if (interaction.isAutocomplete()) {
            client.autocomplete(interaction, client);

        } else if (interaction.isButton()) {
            switch (interaction.customId) {
                case 'btn_name':
                    console.log("Do something...")
                    break;
            }
        }
    }
}
