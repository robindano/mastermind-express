const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/scores');

router.post('/', scoresCtrl.create);

router.use(require('../../config/auth'));
router.get('/', checkAuth, scoresCtrl.highScores);

function checkAuth(req, res, next) {
    if(req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;