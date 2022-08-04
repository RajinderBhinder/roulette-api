const spinRouter = require('express').Router();
const { getSpinResult } = require('../controllers/spin');

spinRouter.route('').get(getSpinResult);

module.exports = spinRouter;
