const fs = require('fs');
const CountModel = require('./wc.model');

function dataStat(data) {
    return new Promise((resolve) => { /* because we don't reject */
        let input = data.split('');
        let charCount = input.length; /* The length of string is character count */
        let wordCount = 0;
        let lineCount = data.split('\n').length;
        let spaceCount = 0; 
        let lowerCaseCount = 0; /* lowercase letters */
        let upperCaseCount = 0; /* uppercase letters */
        let numberCount = 0; /* numbers */
        let specialCount = 0; /* not alphanum */
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
        resolve (new CountModel(charCount, lineCount, lowerCaseCount, numberCount, spaceCount, specialCount, upperCaseCount, wordCount));
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
                dataStat(str).then(countModel => resolve(countModel));
            }
        });
    });
}

module.exports = {
    wc
};