const mongoose = require('mongoose');
const PaysSchema = new mongoose.Schema({
    nomPays: { type: String, required: true }
});
module.exports = mongoose.model('Pays', PaysSchema);