const wc = require('./node-wc');
const CountModel = require('./wc.model');

function testSampleText() {
    const expected = new CountModel(
        chars = 28,
        lines = 2,
        lowers = 20,
        numbers = 0,
        spaces = 5,
        specials = 7,
        uppers = 1,
        words = 6
    );
    wc.wc('./sample.txt').then(out => {
        Object.keys(expected).forEach(x => {
            console.log('testSampleText:', x, out[x], out[x] === expected[x] ? '===' : '!==', expected[x]);
        });
        console.log('done.');
    }).catch(err => {
        console.log(err)
    });
}

module.exports = {
    testSampleText
};