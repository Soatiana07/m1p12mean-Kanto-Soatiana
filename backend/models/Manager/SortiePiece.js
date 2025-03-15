const mongoose = require('mongoose');
const SortiePieceSchema = new mongoose.Schema({
    dateSortie: { type: Date, required: true },
    idDevis: { type: mongoose.Schema.Types.ObjectId,ref: 'DevisClient'}
});
module.exports = mongoose.model('SortiePiece', SortiePieceSchema);