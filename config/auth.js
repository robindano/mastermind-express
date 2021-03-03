// jwt library
const jwt = require('jsonwebtoken');
// secret
const SECRET = process.env.SECRET;

// define and export out auth middleware
module.exports = function(req, res, next) {
    // 1) grab the autrhorization header value from  the request
    let token = req.get('Authorization');
    if(token) {
        // 2) take the token portion from that value
        token = token.replace('Bearer ', '');
        // 3) verify and decode the token
        if(token !== 'null') {
            jwt.verify(token, SECRET, function(err, decoded) {
                if(err) next(err);
                // 4) grab the user portion from the token paylopad
                //    and add them to req.user
                req.user = decoded.user;
                next();
            });
        }
    } else {
        next();
    };
};