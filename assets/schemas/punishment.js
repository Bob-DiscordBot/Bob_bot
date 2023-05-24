const { Schema, model} = require('mongoose');

const ReqString = {
    type: String,
    required: true,
}

const punishmentSchema = new Schema({
    guildId: ReqString,
    userId: ReqString,
    staffId: ReqString,
    expires: Date,
    type: {
        enum: [ 'ban', 'mute' ],
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model("Punishment", punishmentSchema, "punishment");
