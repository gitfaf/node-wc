const fs = require('fs');

function dataStat (data) {
    let input = data.split('');
    let charCount = 0;
    let wordCount = 0;
    let lineCount = 0;
    let spaceCount = 0;
    let lowerCaseCount = 0;
    let upperCaseCount = 0;
    let numberCount = 0;
    let specialCount = 0;
    let inWord = false;
    for (let i = 0; i < input.length; i++) {
        charCount++;
        if (input[i] === ' ') {
            spaceCount++;
            if(inWord) {
                inWord = false;
                wordCount++;
            }
        } else if (input[i] === '\n') {
            lineCount++;
            if(inWord) {
                inWord = false;
                wordCount++;
            }
        }
        if (input[i] >= 'a' && input[i] <= 'z') {
            lowerCaseCount++;
            inWord = true;
        } else if (input[i] >= 'A' && input[i] <= 'Z') {
            upperCaseCount++;
            inWord = true;
        } else if (input[i] >= '0' && input[i] <= '9') {
            numberCount++;
            inWord = false;
        } else {
            specialCount++;
        }
    }
    return {
        chars: charCount,
        words: wordCount,
        numbers: numberCount,
        specials: specialCount - spaceCount,
        lines: lineCount + 1,
        lowers: lowerCaseCount,
        uppers: upperCaseCount,
        spaces: spaceCount
    };
}

function wc (filename) {
    fs.readFile(filename, (e, data) => {
        if(e)
            console.log(e.message);
        else 
            console.log(dataStat(data.toString('utf8')));
    });
}

module.exports = {
    wc
};
