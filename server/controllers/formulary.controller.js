const Formulary = require('../models/formulary.model');    /* this is new */
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
          /* The method below is new */
module.exports.createMedication = (request, response) => {
    // Mongoose's "create" method is run using our Person model to add a new person to our db's person collection.
    // request.body will contain something like {firstName: "Billy", lastName: "Washington"} from the client
    Formulary.create(request.body) //This will use whatever the body of the client's request sends over
        .then(medication => response.json(medication))
        .catch(err => response.json(err));
}

// const Product = require('../models/product.model');

// module.exports = {
//     // CREATE PRODUCT
//     createProduct: (req, res) => {
//         console.log(req.body)
//         Product.create(req.body)
//             .then(newProduct => res.json(newProduct))
//             .catch(err => res.status(400).json(err))
//     },

//     // READ ONE PRODUCT
//     getOneProduct: (req,res) => {
//         console.log(req)
//         // Product.findById(req.params.id) // may need _id:req.params.id with findOne
//         Product.findOne({_id:req.params.id}) 
//             .then(oneProduct => res.json(oneProduct))
//             .catch(err => res.status(400).res.json(err))
//     },

//     // READ ALL PRODUCTS
//     getAllProducts: (req,res) => {
//         Product.find().sort({title:1}) //sort added see docs
//             .then(allProducts => res.json(allProducts))
//             .catch(err => res.status(400).json(err))
//     },

//     // UPDATE PRODUCT
//     updateProduct: (req,res) => {
//         Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
//             .then(updateProduct => res.json(updateProduct))
//             .catch((err => res.status(400).json(err)))
//     },

//     // DELETE PRODUCT
//     deleteProduct: (req,res) => {
//         Product.deleteOne({_id:req.params.id})
//         .then(deleteOneProduct => res.json(deleteOneProduct))
//         .catch((err) => console.log(err))
//     }

// }