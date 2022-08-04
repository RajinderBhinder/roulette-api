const { expect } = require('chai');
const sinon = require('sinon');
const { checkWinner, getSpinResult, getWinningNumber } = require('../controllers/spin');
const { rouletteWheelData } = require('../assets');

const testRouletteData = rouletteWheelData;

describe('spin', () => {
    describe('getWinningNumber', () => {
        it('should return the routettle wheel number object', () => {
            const res = getWinningNumber();
            expect(res).to.haveOwnProperty('colour');
            expect(res).to.haveOwnProperty('value');
        });

        it('should return the roulette item at index returned by random generator', () => {
            sinon.stub(Math, 'random').returns(0.15);
            const res = getWinningNumber();
            expect(res).to.deep.equal(testRouletteData[5]);
        });
    });

    describe('checkWinner', () => {
        describe('single', () => {
            it('should return true when there is a match', () => {
                const res = checkWinner('single', '1', {colour: 'red', value: 1})
                expect(res).to.be.true;
            });
            it('should return false when there is no match', () => {
                const res = checkWinner('single', '1', {colour: 'red', value: 5})
                expect(res).to.be.false;
            });
        });

        describe('colour', () => {
            it('should return true when there is a match', () => {
                const res = checkWinner('colour', 'red', {colour: 'red', value: 1})
                expect(res).to.be.true;
            });
            it('should return false when there is no match', () => {
                const res = checkWinner('colour', 'black', {colour: 'red', value: 5})
                expect(res).to.be.false;
            });
        });

        describe('odd/even', () => {
            it('should return true when there is a match for odd', () => {
                const res = checkWinner('odd/even', 'odd', {colour: 'red', value: 1})
                expect(res).to.be.true;
            });
            it('should return false when there is no match for odd', () => {
                const res = checkWinner('odd/even', 'odd', {colour: 'red', value: 6})
                expect(res).to.be.false;
            });
            it('should return true when there is a match for even', () => {
                const res = checkWinner('odd/even', 'even', {colour: 'red', value: 2})
                expect(res).to.be.true;
            });
            it('should return false when there is no match for even', () => {
                const res = checkWinner('odd/even', 'even', {colour: 'red', value: 5})
                expect(res).to.be.false;
            });
        });

        describe('range', () => {
            it('should return true when there is a match within range', () => {
                const res = checkWinner('range', '[2, 10]', {colour: 'red', value: 5})
                expect(res).to.be.true;
            });
            it('should return false when the number is greater than the range', () => {
                const res = checkWinner('range', '[2,10]', {colour: 'red', value: 11})
                expect(res).to.be.false;
            });
            it('should return false when the number is less than the range', () => {
                const res = checkWinner('range', '[2,10]', {colour: 'red', value: 1})
                expect(res).to.be.false;
            });
        });

        describe('error', () => {
            it('should throw an error when bet type is not valid', () => {
                expect(() => checkWinner('wrongType', '1', {colour: 'red', value: 5})).to.throw();
            });
        });
    });
});