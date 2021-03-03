const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/scores');

router.post('/', scoresCtrl.create);

// this creates req.user from the 'Authorization' headers we sent from React
router.use(require('../../config/auth'));
router.get('/', checkAuth, scoresCtrl.highScores);

// after we supposedly created req.user, 
// so we should check to see if it exists
function checkAuth(req, res, next) {
    if(req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;