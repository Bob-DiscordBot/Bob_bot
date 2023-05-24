const chalk = require('chalk');

module.exports = {
    name: 'error',
    async execute(interaction, client){
        console.log(chalk.yellowBright(`[Event] ${interaction} ${client}`));
    }
}
