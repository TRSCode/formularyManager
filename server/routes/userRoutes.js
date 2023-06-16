const UserController = require('../controllers/userController');

module.exports = app => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.loginUser);
    app.post('/api/logout', UserController.logoutUser);
    // app.get('/api/users', UserController.getAllUsers);
    // app.get('/api/users/:id', UserController.getOneUser);
    // app.put('/api/users/:id', UserController.updateUser);
    // app.delete('/api/users/:id', UserController.deleteUser);
}