function removeSpacesAndLowerCase(inputString) {
    // Remove all whitespaces using regular expression
    let stringWithoutSpaces = inputString.replace(/\s/g, '');

    // Convert the string to lowercase
    let lowerCaseString = stringWithoutSpaces.toLowerCase();

    return lowerCaseString;
}

module.exports = {
    removeSpacesAndLowerCase: removeSpacesAndLowerCase
};