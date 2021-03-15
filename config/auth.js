const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
    let token = req.get('Authorization');
    if(token) {
        token = token.replace('Bearer ', '');
        if(token !== 'null') {
            jwt.verify(token, SECRET, function(err, decoded) {
                if(err) next(err);
                req.user = decoded.user;
                next();
            });
        }
    } else {
        next();
    };
};