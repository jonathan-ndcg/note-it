const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    body: String,
    user_id: String
});

module.exports = mongoose.model('notes', NoteSchema);