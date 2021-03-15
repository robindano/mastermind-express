const Score = require('../models/score');

module.exports = {
  create,
  highScores
};

async function create(req, res) {
  try {
    await Score.create(req.body);
    highScores(req, res);
  } catch (err) {
    res.json({err});
  }
}

async function highScores(req, res) {
  console.log(req.user);
  const scores = await Score.find({})
    .sort({numGuesses: 1, seconds: 1})
    .limit(req.query.limit || 20);
  res.json(scores);
}