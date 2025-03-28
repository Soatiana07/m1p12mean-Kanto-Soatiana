const mongoose = require('mongoose');
const DemandeDevisSchema = new mongoose.Schema({
    dateDemandeDevis: { type: Date, required: true},
    idVoitureClient: { type: mongoose.Schema.Types.ObjectId, ref: 'VoitureClient' },
    heureFini: {type: String, default: "00"},
    minuteFini: {type: String, default: "00"}
    
});
module.exports = mongoose.model('DemandeDevis', DemandeDevisSchema);