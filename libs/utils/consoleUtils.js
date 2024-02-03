const {colorHex, timeStampByData, timeResponseBySeconds} = require("./utilsManager");

module.exports = {
    consoleErro: (type_erro, msg) => {
        console.error(colorHex(`[${type_erro}]`, '#d63e3e'), msg)
    },

    consoleCmd: (isGroupMsg, category, command, hex, timestampMsg, memberName, chatName) => {
        let tMsg = timeStampByData(timestampMsg)
        let tResponse = timeResponseBySeconds(timestampMsg)

        if (isGroupMsg) {
            console.log('\x1b[1;31m~\x1b[1;37m>', colorHex(`[GRUPO - ${category}]`, hex), tMsg, colorHex(command), 'de', colorHex(memberName), 'em', colorHex(chatName), `(${colorHex(`${tResponse}s`)})`)
        } else {
            console.log('\x1b[1;31m~\x1b[1;37m>', colorHex(`[PRIVADO - ${category}]`, hex), tMsg, colorHex(command), 'de', colorHex(memberName), `(${colorHex(`${tResponse}s`)})`)
        }
    }
}