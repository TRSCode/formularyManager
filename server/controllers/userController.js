const User = require('../models/userModel');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    registerUser: async (req, res) => {
        try {
            // check if user already exists in db
            const potentialUser = await User.findOne({ email: req.body.email });
            if (potentialUser) {
                res.status(400).json({message: 'User already exists'})
            }else{
                // create user
                const newUser = await User.create(req.body);

                // generate a user token
                const userToken = jwt.sign({_id: newUser._id, email:newUser}, secret,{expiresIn: '2h'});
                // Sending user data back to the client
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000}).json(newUser);
            }
        } catch (err) { 
            res.status(400).json(err);
        }
    },
    // login user controller
    loginUser: async (req, res) => {
        try{
            //check if the user exists in the db
            const user = await User.findOne({email: req.body.email});
            if(user){
                // check to see if the password hash entered matches the password in the db for that email
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
                if(passwordsMatch){
                    // generate a user token
                    // log the user in
                    const userToken = jwt.sign({_id: user._id, email:user.email}, secret,{expiresIn: '2h'});
                    // Sending user data back to the client
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000}).json(user);
                }
                else{
                    // if the password doesn't match and email exists
                    res.status(400).json({message: 'Invalid login attempt'});
                }
            }
            // if the User doesn't exist
            else{
                res.status(400).json({message: 'Invalid login attempt'});
            }
        }
        catch(err){
            res.status(400).json(err);
        }
    },
    // logout user controller
    logoutUser: (req, res) => {
        res.clearCookie('userToken').json({message: 'You have successfully logged out'});
        res.sendStatus(200);
    }
}