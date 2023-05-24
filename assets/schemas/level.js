const { Schema, model} = require('mongoose');
const levelSchema = new Schema({
    guildId: String,
    userId: String,
    xp: Number,
    level: Number,
});

module.exports = model("Level", levelSchema, "level");
