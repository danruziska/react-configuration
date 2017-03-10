// Centralized configuration for chalk, which is used to add color to console.log statements.
const chalk = require('chalk');

module.exports = {
    chalkSuccess : chalk.green,
    chalkError : chalk.red, 
    chalkWarning : chalk.yellow, 
    chalkProcessing : chalk.blue 
}