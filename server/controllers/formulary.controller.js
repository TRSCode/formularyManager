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