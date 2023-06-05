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
        required: [true, "Unit Type is required"],
        enum: ['EA', 'PG', 'VI', 'TU', 'BT', 'BX', 'KT', 'CO', 'other']
    },
    unitCost: {
        type: String,
        required: [true, "Unit Cost is required"]
    },
    authorizedAmount: { 
        type: Number,
        required: [true, "Quantity Authorized is required"],
        minlength: [1, "Quantity Authorized must contain a number"],
        maxlength: [10, "Quantity Authorized cannot exceed 10 numbers"]
    },
    onHand: { 
        type: Number,
        required: [true, "Amount on hand is required"],
        minlength: [1, "Amount on hand must contain a number"],
        maxlength: [10, "Amount on hand cannot exceed 10 numbers"]
    },
    inventoryAmount: { 
        type: Number,
        required: [false, "Inventory Amount is required"],
        // minlength: [1, "Amount on hand must contain a number"],
        // maxlength: [10, "Amount on hand cannot exceed 10 numbers"]
    },
    lotNumber: { 
        type: String,
        required: [true, "Lot Number is required"],
        minlength: [1, "Lot Number must contain at least 1 character"],
        maxlength: [40, "Lot Number cannot exceed 40 characters"]
    },
    expiration: { 
        // type: Date,
        type: String,
        required: [true, "Expiration Date is required"]
        // validate: {
        //     validator: function (value) {
        //         const currentDate = new Date();
        //         const enteredDate = new Date(value);
        //         return enteredDate > currentDate;
        //     },
        //     message: "Expiration Date must be in the future"
        // }
    },
    // expiration: {
    //     type: String,
    //     required: [false, "Expiration Date is required"],
    //     validate: {
    //         validator: function (value) {
    //             const currentDate = new Date();
    //             const enteredYear = parseInt(value.substring(0, 4));
    //             const enteredMonth = parseInt(value.substring(5, 7));
    //             const enteredDate = new Date(enteredYear, enteredMonth - 1); // Subtract 1 from month since it is zero-indexed in JavaScript
    //             return enteredDate > currentDate;
    //         },
    //         message: "Expiration Date must be in the future"
    //     }
    // },
    nsn: { 
        type: String,
        required: [true],
        minlength: [16, "NSN must contain 13 characters"],
        maxlength: [16, "NSN must contain 13 characters"]
    },
    ndc: { 
        type: String,
        required: [false]
        // minlength: [1, "NDC must contain at least 1 character"],
        // maxlength: [45, "NDC cannot exceed 45 characters"]
    },
    supplier: { 
        type: String,
        required: [false],
        minlength: [1, "Supplier must contain at least 1 character"],
        maxlength: [45, "Supplier cannot exceed 45 characters"]
    },
    ciic: { 
        type: String,
        required: [true, "CIIC must select one"],
        enum: ['Q', 'R', 'U', 'J','other']
    },
    dispenseLevel: { type: String,
                    required: [true,"Dispense Level is required"],
                    enum: ['Prescriber', 'Delegate']
    },
    storageLocation: { 
        type: String,
        required: [true, "Storage Location is required"],
        enum: ['Locker', 'Grey Cabinet', 'White Cabinet', 'Clinic Refrigerator', 'Blue Vial Bag', 'Orange Paramedic Bag', 'Safe-Black Bag', 'Safe-Blue Bag','Safe-Orange Bag','MRV', 'ALS', 'Turn-in', 'other']
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