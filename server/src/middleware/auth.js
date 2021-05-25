const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        // get the tokem
        const token = req.cookies.token;

        // check if we have a token
        if(!token) 
            return res.status(401).json({errorMessage: Unauthorized});

        // validate the token, checking if the token was created with the password
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // getting the logged user id
        req.author = verified.user;

        next();
    }
    // in case an error happen 
    catch(err) {
        console.error(err);
        res.status(401).json({errorMessage: Unauthorized});
    }
}

module.exports = auth;