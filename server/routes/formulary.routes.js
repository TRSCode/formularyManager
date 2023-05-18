const FormularyController = require('../controllers/formulary.controller');  
module.exports = (app) => {

    app.post('/api/formulary', FormularyController.createMed);
    app.get('/api/formulary', FormularyController.getAllMeds);
    app.get('/api/formulary/:id', FormularyController.getOneMed);
    app.patch('/api/formulary/:id', FormularyController.updateMed);
    app.delete('/api/formulary/:id', FormularyController.deleteMed);
}