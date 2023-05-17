const mongoose = require('mongoose');
const FormularySchema = new mongoose.Schema({
    medication: { type: String },
    description: { type: String },
    // this includes strength and dosage form
    units: { type: String },
    // add enum for EA, PG, BX, TU etc
    authorizedAmount: { type: String },
    onHand: { type: String },
    lotNumber: { type: String },
    expiration: { date: Number },
    nsn: { type: String },
    ndc: { type: String },
    supplier: { type: String },
    ciic: { type: String },
    dispenseLevel: { type: String },
    storageLocation: { type: String }
    // add enum for possible locations
}, { timestamps: true });
module.exports = mongoose.model('Formulary', FormularySchema);