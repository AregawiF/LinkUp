const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["dm", "group", "channel"], required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
