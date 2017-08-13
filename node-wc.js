const fs = require('fs');

function dataStat(data) {
    return new Promise((resolve) => { /* because we don't reject */
        let input = data.split('');
        let charCount = input.length; /* The length of string is character count */
        let wordCount = 0;
        let lineCount = data.split('\n').length;
        let spaceCount = 0;
        let lowerCaseCount = 0;
        let upperCaseCount = 0;
        let numberCount = 0;
        let specialCount = 0;
        let inWord = false;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === ' ') {
                spaceCount++;
                if (inWord) {
                    inWord = false;
                    wordCount++;
                }
            } else if (input[i] === '\n' && inWord) {
                inWord = false;
                wordCount++;
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
        resolve ({
            chars: charCount,
            words: wordCount,
            numbers: numberCount,
            specials: specialCount - spaceCount,
            lines: lineCount,
            lowers: lowerCaseCount,
            uppers: upperCaseCount,
            spaces: spaceCount
        });
    });
}

function wc(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (error, data) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else {
                let str = data.toString('utf8');
                dataStat(str).then(x => resolve(x));
            }
        });
    });
}

module.exports = {
    wc
};