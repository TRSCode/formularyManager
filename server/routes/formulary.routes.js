const FormularyController = require('../controllers/formulary.controller');  
module.exports = (app) => {
    app.get('/api', FormularyController.index);
    app.post('/api/formulary', FormularyController.createMedication);

}