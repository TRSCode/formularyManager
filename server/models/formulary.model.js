const mongoose = require('mongoose');

const FormularySchema = new mongoose.Schema({
    medication: { 
        type: String,
        required: [true,"Medication Name Required"],
        minlength: [2, "Name must contain at least 2 characters"],
        maxlength: [45, "Name cannot be more than 45 characters long"]
        
    },
    description: { 
        type: String,
        required: [true,"Description must include strength and dose form"],
        minlength: [3, "Description must contain at least 3 characters"],
        maxlength: [45, "Description cannot be more than 45 characters long"]
    },
    unitType: { 
        type: String,
        required: [false, "Unit Type is required"],
        enum: ['EA', 'PG', 'VI', 'TU', 'BT', 'BX', 'KT', 'CO', 'other']
    },
    authorizedAmount: { 
        type: Number,
        required: [false, "Quantity Authorized is required"],
        minlength: [1, "Quantity Authorized must contain a number"],
        maxlength: [10, "Quantity Authorized cannot exceed 10 numbers"]
    },
    onHand: { 
        type: Number,
        required: [true, "Amount on hand is required"],
        minlength: [1, "Amount on hand must contain a number"],
        maxlength: [10, "Amount on hand cannot exceed 10 numbers"]
    },
    lotNumber: { 
        type: String,
        required: [true, "Lot Number is required"],
        minlength: [1, "Lot Number must contain at least 1 character"],
        maxlength: [40, "Lot Number cannot exceed 40 characters"]
    },
    expiration: { 
        type: Date,
        required: [false, "Expiration Date is required"],
        minlength: [4, "Expiration Date must contain at least 4 numbers"],
        maxlength: [ 10, "Expiration Date cannot exceed 10 characters"]
    },
    nsn: { 
        type: String,
        required: [false],
        minlength: [13, "NSN must contain 13 characters"],
        maxlength: [13, "NSN must contain 13 characters"]
    },
    ndc: { 
        type: String,
        required: [false],
        minlength: [1, "NDC must contain at least 1 character"],
        maxlength: [45, "NDC cannot exceed 45 characters"]
    },
    supplier: { 
        type: String,
        required: [false],
        minlength: [1, "Supplier must contain at least 1 character"],
        maxlength: [45, "Supplier cannot exceed 45 characters"]
    },
    ciic: { 
        type: String,
        required: [false, "CIIC must select one"],
        enum: ['Q', 'R', 'U', 'J']
    },
    dispenseLevel: { type: String,
                    required: [false,"Dispense Level is required"],
                    enum: ['Presciber', 'Delegate']
    },
    storageLocation: { 
        type: String,
        required: [false, "Storage Location is required"],
        enum: ['Shelf 1', 'Shelf 2', 'Shelf 3', 'Airway Kit', 'Safe']
    },
    activeStatus: {
        type: Boolean,
        required: [false, "Active Status is required"],
        enum: [true, false],
        default: true
    },
    notes: {
        type: String,
        required: [false],
        maxlength: [256,"Notes cannot exceed 256 characters"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Formulary', FormularySchema);