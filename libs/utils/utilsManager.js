const path = require('path')
const chalk = require('chalk')
const crypto = require("crypto");
const moment = require('moment-timezone');

module.exports = {
    colorHex: (text, color) => {
        return !color ? chalk.green(text) : chalk.hex(color)(text)
    },

    colorRgb: (text, color) => {
        return !color ? chalk.green(text) : chalk.keyword(color)(text)
    },

    multiReplace: (text, replaces) => {
        const keys = Object.keys(replaces)
        const pattern = new RegExp(keys.map(key => key.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')

        return text.replace(pattern, match => replaces[match])
    },

    createText: (text, ...params) => {
        for (let i = 0; i < params.length; i++) {
            text = text.replace(`{p${i + 1}}`, params[i])
        }
        return text
    },

    dataMsgConsole: (msgRegion) => {
        const msgPath = path.resolve(__dirname, '../../messages/lang/', msgRegion)
        return require(msgPath)
    },

    createSerial: (size) => {
        return crypto.randomBytes(size).toString('hex').slice(0, size)
    },

    firstLetterCapitalized: (text) => {
        return text.charAt(0).toUpperCase() + text.substring(1)
    },

    timeStampByData: (data) => {
        return moment(data).format('DD/MM/YYYY HH:mm:ss')
    },

    timeResponseBySeconds: (data) => {
        const r = moment.now - data
        return (r / 1000).toFixed(2)
    },

    convertMinutesToMilliseconds : (response) => {
        return response * (60 * 100)
    },

    convertSecondsToMilliseconds : (response) => {
        return response * (1000)
    }
}
