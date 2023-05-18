const mongoose = require('mongoose');
const FormularySchema = new mongoose.Schema({
    medication: { type: String },
    description: { type: String },
    // this includes strength and dosage form
    units: { type: String,
            enum: ['EA', 'PG', 'VI', 'TU', 'BT', 'BX', 'KT', 'CO', 'other']
    },
    authorizedAmount: { type: Number },
    onHand: { type: Number },
    lotNumber: { type: String },
    expiration: { type: Date },
    nsn: { type: String },
    ndc: { type: String },
    supplier: { type: String },
    ciic: { type: String,
            enum: ['Q', 'R', 'U', 'J']
    },
    dispenseLevel: { type: String,
                    enum: ['Presciber', 'Delegate']
    },
    storageLocation: { 
        type: String,
        enum: ['Shelf 1', 'Shelf 2', 'Shelf 3', 'Airway Kit', 'Safe']
    },
    notes: {type: String}
}, { timestamps: true });
module.exports = mongoose.model('Formulary', FormularySchema);