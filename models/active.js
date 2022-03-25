const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activeSchema = new Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true });

const Active = mongoose.model('Active', activeSchema);
module.exports = Active;