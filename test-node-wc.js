const wc = require('./node-wc');

function testSampleText() {
    const expected = {
        chars: 28,
        words: 6,
        numbers: 0,
        specials: 2,
        lines: 2,
        lowers: 20,
        uppers: 1,
        spaces: 5
    };
    wc.wc('./sample.txt').then(out => {
        Object.keys(expected).forEach(x => {
            console.log('testSampleText: ', x, out[x] === expected[x] ? '+' : 'x');
        });
        console.log('done.');
    }).catch(err => {
        console.log(err)
    });
}

module.exports = {
    testSampleText
};