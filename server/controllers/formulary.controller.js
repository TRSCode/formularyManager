const Formulary = require('../models/formulary.model');   

module.exports = {
    // CREATE MED
    createMed: (req, res) => {
        console.log(req.body)
        Formulary.create(req.body)
            .then(newMed => res.json(newMed))
            .catch(err => res.status(400).json(err))
    },

    // READ ONE MED
    getOneMed: (req,res) => {
        console.log(req)
        // Formulary.findById(req.params.id) // may need _id:req.params.id with findOne
        Formulary.findOne({_id:req.params.id}) 
            .then(oneMed => res.json(oneMed))
            .catch(err => res.status(400).res.json(err))
    },

    // READ ALL MEDS
    getAllMeds: (req,res) => {
        Formulary.find().sort({medication:1}) //sort added see docs
            .then(allMeds => res.json(allMeds))
            .catch(err => res.status(400).json(err))
    },

    // UPDATE MED
    updateMed: (req,res) => {
        Formulary.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
            .then(updateMed => res.json(updateMed))
            .catch((err => res.status(400).json(err)))
    },

    // DELETE MED
    deleteMed: (req,res) => {
        Formulary.deleteOne({_id:req.params.id})
        .then(deleteOneMed => res.json(deleteOneMed))
        .catch((err) => console.log(err))
    },

    // UPDATE INVENTORY
    updateInventory: (req, res) => {
        Formulary.findByIdAndUpdate(
        { _id: req.params.id },
        { inventoryAmount: req.body.inventoryAmount },
        { new: true, runValidators: true }
        )
        .then(updateMed => res.json(updateMed))
        .catch(err => res.status(400).json(err));
    }
}