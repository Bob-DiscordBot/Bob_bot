module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[Event] ${this.name}`);

        //TODO Init DB

        await client.handleSlashCommands();

        let allCommands = [];
        await client.commands.forEach(cmd => allCommands.push({
            commandName: cmd.name,
            commandUsage: '/' + cmd.name,
            commandDescription: cmd.description
            //commandAlias: 'No Aliases'
        }));

        console.log(`Ready ! ${client.user.tag} is logged in and online.`);
    }
}
