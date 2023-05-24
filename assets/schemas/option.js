const { Schema, model} = require('mongoose');
const optionSchema = new Schema({
    guildId: String,
    language: String
});

module.exports = model("Option", optionSchema, "options");
