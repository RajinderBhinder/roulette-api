const app = require('../app');
const request = require('supertest')(app); 
const {expect} = require('chai');
const { rouletteWheelData } = require('../assets');


const testRouletteWheel = rouletteWheelData;

describe('/api', () => {
    describe('/wrongPath', () => {
        it('GET returns 404 and error message', () => {
            return request.get('/wrongPath')
            .expect(404)
            .then(res => {
                expect(res.body.msg).to.equal('Path not found')
            })
        });
    });

    describe('/roulette', () => {
        it('GET returns 200 and all the roulette numbers', () => {
            return request.get('/api/roulette')
            .expect(200)
            .then(({body: {rouletteWheel}}) => {
                expect(rouletteWheel.length).to.equal(testRouletteWheel.length);
                expect(rouletteWheel[0].colour).to.equal(testRouletteWheel[0].colour);
                expect(rouletteWheel[0].value).to.equal(testRouletteWheel[0].value);
            })
        });
    });

    describe('/spin', () => {
        it('GET returns 200 and the game result', () => {
            return request.get('/api/spin?betType=single&&betValue=5')
            .expect(200)
            .then(({body: {gameResult}}) => {
                expect(gameResult).to.haveOwnProperty('won');
                expect(gameResult).to.haveOwnProperty('winningColour');
                expect(gameResult).to.haveOwnProperty('winningValue');
            })
        });

        it('GET with an invalid betType value returns 400 and the error message', () => {
            return request.get('/api/spin?betType=wrongType&&betValue=5')
            .expect(400)
            .then(res => {
                expect(res.body.message).to.equal('Invalid bet type');
            })
        });
    });
});