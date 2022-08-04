const { rouletteWheelData } = require('../assets');

const rouletteWheel = rouletteWheelData;

getSpinResult = (req, res, next) => {
    const { betType, betValue } = req.query;
    const winningNumber = getWinningNumber();

    try {
        const won = checkWinner(betType, betValue, winningNumber);
    
        const gameResult = {
            won,
            winningColour: `${winningNumber.colour.toUpperCase()}`,
            winningValue: `${winningNumber.value}`
        }
    
        return res.status(200).send({ gameResult });

    } catch (error) {
        return res.status(400).send({message: error.message});
    }

}


/**
 * checkWinner - Uses conditions to check if the player won
 * @param betType string - The type of bet placed
 * @param betValue string - The value of the bet
 * @param winningNumber object - The winning item from the roulette wheel array
 * @returns Boolean - True if the player won; else false
 */
checkWinner = (betType, betValue, winningNumber) => {
    switch (betType) {
        case 'single':
            return JSON.parse(betValue) === winningNumber.value;
        case 'colour':
            return betValue === winningNumber.colour;
        case 'odd/even':
            const isOddOrEven = winningNumber.value % 2 === 0? 'even' : 'odd';
            return betValue === isOddOrEven;
        case 'range':
            const parsedBetValue = JSON.parse(betValue);
            return winningNumber.value >= parsedBetValue[0]  && winningNumber.value <= parsedBetValue[1];
        default:
            throw new Error('Invalid bet type');
    }
}

/**
 * getWinningNumber - Uses random index to get the winning item from roulette wheel array
 * @returns Object A roulette wheel item
 */
getWinningNumber = () => {
    const max = rouletteWheel.length;
    const winningIndex = Math.floor(Math.random() * max);
    return rouletteWheel[winningIndex];
}

module.exports = { checkWinner, getSpinResult, getWinningNumber};
