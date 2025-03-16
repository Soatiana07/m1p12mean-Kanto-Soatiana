const mongoose = require('mongoose');

const AnneeVoitureSchema = new mongoose.Schema({
    annee: {type: Number, required: true},
    note: { type: Number, required: true }
}, {timestamps: true});

module.exports = mongoose.model('AnneeVoiture', AnneeVoitureSchema);