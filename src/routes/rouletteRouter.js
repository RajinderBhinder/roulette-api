const rouletteRouter = require('express').Router();
const {getRouletteWheelData} = require('../controllers/rouletteWheel');

rouletteRouter.route('').get(getRouletteWheelData);

module.exports = rouletteRouter;