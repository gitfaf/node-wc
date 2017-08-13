class CountModel {
    constructor(charCount, lineCount, lowerCaseCount, numberCount, spaceCount, specialCount, upperCaseCount, wordCount) {
        this.chars = charCount;
        this.lines = lineCount;
        this.lowers = lowerCaseCount;
        this.numbers = numberCount;
        this.spaces = spaceCount;
        this.specials = specialCount - spaceCount;
        this.uppers = upperCaseCount;
        this.words = wordCount;
    }
}

module.exports = CountModel;
