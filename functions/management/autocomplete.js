

module.exports = (client) => {
    client.autocomplete = async (interaction, client) => {
        const focusedOption = interaction.options.getFocused(true);
        let choices;

        switch (interaction.commandName) {
            case 'help':
                choices = client.commands.filter(cmd => cmd.name.includes(focusedOption.value));
                break;

                /*
            case 'moveme':
                console.log("move me")
                choices = [];
                interaction.guild.channels.cache.forEach(channel => {
                    if (channel.isVoiceBased()) choices.push(channel);
                });
                break;
                 */
        }

        console.log("Choices :", choices);

        const filtered = focusedOption.value === '' ? choices : choices.filter(choice => choice.startsWith(focusedOption.value));
        await interaction.respond(filtered.map(choice => ({ name: choice.name, value: choice.name })));
    }
}
