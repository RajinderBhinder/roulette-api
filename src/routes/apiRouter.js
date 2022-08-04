const apiRouter = require('express').Router();
const rouletteRouter = require('./rouletteRouter');
const spinRouter = require('./spinRouter');

apiRouter.use('/roulette', rouletteRouter);
apiRouter.use('/spin', spinRouter);

module.exports = apiRouter;