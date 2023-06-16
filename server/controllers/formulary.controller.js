const Formulary = require('../models/formulary.model');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
// const User = require('../models/userModel');

module.exports = {
    // CREATE MED
    createMed: (req, res) => {
        // console.log(req.body)
        const user = jwt.verify(req.cookies.userToken, secret);
        Formulary.create(req.body)
        // Formulary.create({ req.body, user: user._id })
            .then(newMed => res.json(newMed))
            .catch(err => res.status(400).json(err))
    },

    // READ ONE MED
    getOneMed: (req, res) => {
        console.log(req)
        // Formulary.findById(req.params.id) // may need _id:req.params.id with findOne
        Formulary.findOne({ _id: req.params.id })
            .then(oneMed => res.json(oneMed))
            .catch(err => res.status(400).res.json(err))
    },

    // READ ALL MEDS
    getAllMeds: (req, res) => {
        Formulary.find().sort({ medication: 1 }) //sort added see docs
            .then(allMeds => res.json(allMeds))
            .catch(err => res.status(400).json(err))
    },

    // UPDATE MED
    updateMed: (req, res) => {
        Formulary.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(updateMed => res.json(updateMed))
            .catch((err => res.status(400).json(err)))
    },

    // DELETE MED
    deleteMed: (req, res) => {
        Formulary.deleteOne({ _id: req.params.id })
            .then(deleteOneMed => res.json(deleteOneMed))
            .catch((err) => console.log(err))
    },

    // UPDATE INVENTORY 
    // update or updateMany would require to loop through and do an axios call for each one
    updateInventory: (req, res) => {
        const { medications } = req.body;

        // Create an array to hold the bulk update operations
        const bulkUpdateOperations = [];

        // Iterate through the medications array and create the update operation for each document
        medications.forEach((medication) => {
            const updateOperation = {
                updateOne: {
                    filter: { _id: medication._id },
                    update: { $set: { inventoryAmount: medication.inventoryAmount || '' } }
                }
            };

            bulkUpdateOperations.push(updateOperation);
        });

        // Execute the bulk update operations
        Formulary.bulkWrite(bulkUpdateOperations)
            .then((result) => {
                res.json({ updatedCount: result.modifiedCount });
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

}