# Dependencies

### Discord.js
```shell
npm i discord.js
npm install -g npm@9.6.6
```

### Discord Api Types
```shell
npm i discord-api-types
``` 

### Discord Rest
```shell
npm i @discordjs/rest
``` 

### Dotenv (.env)
```shell
npm i dotenv
```

### Mongoose (Mongo DB)
```shell
npm i mongoose
```

### Chalk (Console colors)
```shell
npm i chalk@4.1.2
```

### Nodemon
```shell
npm i nodemon
```

### -
```shell
npm
```

***
# Commands
## General
| ID | Command Name | Description                                       | Stat |
|----|--------------|---------------------------------------------------|:----:|
| 01 | help         | List of all commands                              |  ✅   |
| 02 | ping         | Test the bots response time                       |  ✅   |
| 03 | vote         | Get the vote link and see when you can vote again |  ✅   |
| 04 | moveme       | Moves you to another voice channel                |  ✅   |
| 05 | color        | Change your color on the server                   |  ⬜   |
| 06 | colors       | Lists you all the available colors                |  ⬜   |

## Info
| ID | Command Name | Description                                                | Stat  |
|----|--------------|------------------------------------------------------------|:-----:|
| 01 | user         | Shows information (ID, Join date) about yourself or a user |   ✅   | - Ajout Icones
| 02 | avatar       | Get a user's avatar                                        |   ✅   |
| 03 | server       | Shows information about the server                         |   ✅   |
| 04 | roles        | Get a list of server roles and member counts               |   ✅   |

## Leveling
| ID | Command Name | Description                                                           | Stat  |
|----|--------------|-----------------------------------------------------------------------|:-----:|
| 01 | profile      | View your or someone else's customizable personal global profile card |   ⬜   |
| 02 | rank         | View your rank card or someone else's in the server                   |   ⬜   |
| 03 | top          | Display the top members by text or voice                              |   ⬜   |
| 04 | title        | Changes your profile title                                            |   ⬜   |
| 05 | setxp        | Sets the user's xp                                                    |   ⬜   |
| 06 | setlevel     | Sets the user's level                                                 |   ⬜   |

## Management
| ID | Command Name | Description                              | Stat  |
|----|--------------|------------------------------------------|:-----:|
| 01 | setantiraid  | Changes the antiraid state on the server |   ⬜   |
| 02 | setantispam  | Changes the antispam state on the server |   ⬜   |
| 03 | setcaptcha   | Setup the captcha                        |   ⬜   |
| 04 | setstatus    | Change bot status                        |   ⬜   |
| 05 | setticket    | Setup tickets                            |   ⬜   |
| 06 | ticket       | Send the ticket embed                    |   ⬜   |

## Moderation
| ID | Command Name | Description                                                 | Stat  |
|----|--------------|-------------------------------------------------------------|:-----:|
| 01 | setnick      | Changes the nickname of a member                            |   ✅   |
| 02 | ban          | Bans a member                                               |   ✅   |
| 03 | tempban      | Temporarily ban a member                                    |   ⬜   |
| 04 | unban        | Unbans a member                                             |   ⬜   |
| 05 | kick         | Kicks a member                                              |   ⬜   |
| 06 | vkick        | Kicks a member from a voice channel                         |   ⬜   |
| 07 | tmute        | Mute a member so they can't type in text channels           |   ⬜   |
| 08 | tunmute      | Unmutes a member from text channels                         |   ⬜   |
| 09 | vmute        | Mute a member so they can't speak in voice channels         |   ⬜   |
| 10 | vunmute      | Unmutes a member from voice channels                        |   ⬜   |
| 11 | timeout      | Timeouts a member                                           |   ⬜   |
| 12 | untimeout    | Removes a timeout from a member                             |   ⬜   |
| 13 | clear        | Cleans up channel messages                                  |   ⬜   |
| 14 | move         | Moves a member to another voice channel                     |   ⬜   |
| 15 | role         | Add/Remove role(s) for a member                             |   ⬜   |
| 16 | warn         | Warns a member                                              |   ⬜   |
| 17 | warnremove   | Remove warnings for the server or user                      |   ⬜   |
| 18 | warnings     | Get the list of warnings for the server or a user           |   ⬜   |
| 19 | lock         | Disable @everyone from sending messages in specific channel |   ⬜   |
| 20 | unlock       | Allows @everyone to send messages in specific channel       |   ⬜   |
| 21 | setcolor     | Changes role's color by hex codes                           |   ⬜   |
| 22 | slowmode     | Enable or disable slowmode on a channel                     |   ⬜   |

## Music
| ID | Command Name | Description                                | Stat  |
|----|--------------|--------------------------------------------|:-----:|
| 01 | play         | Play a song                                |   ⬜   |
| 02 | pause        | Pause playback                             |   ⬜   |
| 03 | resume       | Resume playback                            |   ⬜   |
| 04 | stop         | Stop playback                              |   ⬜   |
| 05 | nowplaying   | Get the current song                       |   ⬜   |
| 06 | queue        | Show current queue                         |   ⬜   |
| 07 | insert       | Play right after this song                 |   ⬜   |
| 08 | skip         | Skip a song                                |   ⬜   |
| 09 | seek         | Change the position of the song            |   ⬜   |
| 10 | leave        | Leave a voice channel                      |   ⬜   |
| 11 | shuffle      | Randomise the queue                        |   ⬜   |
| 12 | volume       | Change volume                              |   ⬜   |
| 13 | lyrics       | ✨ Get the lyrics of currently playing song |   ⬜   |
| 14 | repeat       | ✨ Repeat a song or queue                   |   ⬜   |

# TO DO
- [ ] Role Reaction
- [ ] Auto Role
- [ ] Welcome & Goodbye Message
- [ ] Custom Command
- [ ] Embeds
- [ ] Temp Channels
- [ ] Social alerts (Twitch, Youtube, etc...)
- [ ] Giveaway
- [ ] Birthdays
- [ ] Logs
- [ ] Auto moderation
- [ ] 

***
# Events
| Id | Event Name            | Description                                                                                  | Stat  |
|----|-----------------------|----------------------------------------------------------------------------------------------|:-----:|
| 01 | channelCreate         | Emitted whenever a guild channel is created.                                                 |   ⬜   |
| 02 | channelDelete         | Emitted whenever a channel is deleted.                                                       |   ⬜   |
| 03 | channelUpdate         | Emitted whenever a channel is updated - e.g. name change, topic change, channel type change. |   ⬜   |
| 04 | channelPinsUpdate     | Emitted whenever the pins of a channel are updated.                                          |   ⬜   |
| 05 | debug                 | Emitted for general debugging information.                                                   |   ⬜   |
| 06 | error                 | Emitted when the client encounters an error.                                                 |   ⬜   |
| 07 | guildBanAdd           | Emitted whenever a member is banned from a guild.                                            |   ⬜   |
| 08 | guildBanRemove        | Emitted whenever a member is unbanned from a guild.                                          |   ⬜   |
| 09 | guildCreate           | Emitted whenever the client joins a guild.                                                   |   ⬜   |
| 10 | guildDelete           | Emitted whenever a guild kicks the client or the guild is deleted/left.                      |   ⬜   |
| 11 | guildMemberAdd        | Emitted whenever a user joins a guild.                                                       |   ⬜   |
| 12 | guildMemberRemove     | Emitted whenever a member leaves a guild, or is kicked.                                      |   ⬜   |
| 13 | guildMemberUpdate     | Emitted whenever a guild member changes - i.e. new role, removed role, nickname.             |   ⬜   |
| 14 | guildUpdate           | Emitted whenever a guild is updated - e.g. name change.                                      |   ⬜   |
| 15 | interactionCreate     | Emitted when an interaction is created.                                                      |   ⬜   |
| 16 | inviteCreate          | Emitted when an invite is created.                                                           |   ⬜   |
| 17 | messageCreate         | Emitted whenever a message is created.                                                       |   ⬜   |
| 18 | messageDelete         | Emitted whenever a message is deleted.                                                       |   ⬜   |
| 19 | messageDeleteBulk     | Emitted whenever messages are deleted in bulk.                                               |   ⬜   |
| 20 | messageReactionAdd    | Emitted whenever a reaction is added to a cached message.                                    |   ⬜   |
| 21 | messageReactionRemove | Emitted whenever a reaction is removed from a cached message.                                |   ⬜   |
| 22 | messageUpdate         | Emitted whenever a message is updated - e.g. embed or content change.                        |   ⬜   |
| 23 | ready                 | Emitted when the client becomes ready to start working.                                      |   ⬜   |
| 24 | roleCreate            | Emitted whenever a role is created.                                                          |   ⬜   |
| 25 | roleDelete            | Emitted whenever a guild role is deleted.                                                    |   ⬜   |
| 26 | roleUpdate            | Emitted whenever a guild role is updated.                                                    |   ⬜   |
| 27 | userUpdate            | Emitted whenever a user's details (e.g. username) are changed.                               |   ⬜   |
| 28 | voiceStateUpdate      | Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.  |   ⬜   |
| 29 | warn                  | Emitted for general warnings.                                                                |   ⬜   |
