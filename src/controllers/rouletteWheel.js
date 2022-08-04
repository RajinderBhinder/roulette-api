const { rouletteWheelData } = require('../assets');

const rouletteWheel = rouletteWheelData;

exports.getRouletteWheelData = (req, res, next) => {
    return res.status(200).send({rouletteWheel})
}