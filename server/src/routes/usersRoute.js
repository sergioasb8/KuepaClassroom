const { Router } = require('express');
const router = Router();
const User = require('../models/UserModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/')

    /** ---------- 
     *   Register
     -------------- */

    .post(async (req, res) => {
        try {
            const { name, lastName, mail, user, password, passwordVerify } = req.body;

            /** Validations */
            
            // checking all the inputs have a value
            if(!name || !lastName || !mail || !user || !password || !passwordVerify)
                return res
                    .status(400)
                    .json({errorMessage: "Por favor completar todos los campos requeridos"});
            
            // cheking the length of the password
            if(password.length < 6)
                return res
                    .status(400)
                    .json({errorMessage: "Por favor ingresar una contraseña de minimo 6 caracteres"});

            // cheking the user wrote the password twice
            if(password !== passwordVerify)
                return res
                    .status(400)
                    .json({errorMessage: "Por favor asegurarse de que las contraseñas coincidan"});
            
            // checking the mail is unique
            const existingMail = await User.findOne({mail});
            if(existingMail)
                return res
                    .status(400)
                    .json({errorMessage: "Este correo ya esa siendo usado por otra cuenta, por favor intenta con otro"});
            
            // checking the user is unique
            const existingUser = await User.findOne({user});
            if(existingUser)
                return res
                    .status(400)
                    .json({errorMessage: "Este usuario ya esa siendo usado por otra cuenta, por favor intenta con otro"});

            // hash the password
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            /** Save a new user account to the database */
            const newUser = new User({  // creating a new instance of our schema
                name, lastName, mail, user, passwordHash
            });

            const savedUser = await newUser.save();

            res.json('user created');
        }

        // in case an error happen
        catch(err) {
            console.error(err);
            res.status(500).send();
        }
    });

    /** ---------- 
     *   login
     -------------- */
router.route('/login')
    .post(async (req, res) => {
        try {
            const { user, password } = req.body;

            /** Validations */

            // checking all the inputs have a value
            if( !user || !password )
            return res
                .status(400)
                .json({errorMessage: "Por favor completar todos los campos requeridos"});

            // checking if the user do not exist
            const existingUser = await User.findOne({user});
            if(!existingUser)
                return res
                    .status(401)
                    .json({errorMessage: "Usuario o contraseña incorrectos"});

            // verify if the password is correct
            const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
            if(!passwordCorrect)
                return res
                    .status(401)
                    .json({errorMessage: "Usuario o contraseña incorrectos"});

            /** log the user in */

            // creating the token
            const token = jwt.sign({
                user: existingUser._id
            }, process.env.JWT_SECRET);

            // send the token in a HTTP-only cookie
            res.cookie("token", token, {    // name and value
                httpOnly: true,
            }).send();
        }
        // in case an error happen
        catch(err) {
            console.error(err);
            res.status(500).send();
        }
    });

    /** ---------- 
     *   logout
     -------------- */
router.route('/logout')
.get(async (req, res) => {
    // to the cookie "token" we will set the value to "" (empty)
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    .send();
});

    /** ---------- 
     *   asking for a token
     -------------- */

router.get('/loggedIn', (req, res) => {
    // if we find a token we return true
    try {
        // get the tokem
        const token = req.cookies.token;
        if(!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    }
    // in case an error happen 
    catch(err) {
        res.json(false);
    }
});


module.exports = router;