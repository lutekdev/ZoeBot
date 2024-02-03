const wpp = require("@wppconnect-team/wppconnect");
const moment = require("moment-timezone")
moment.tz.setDefault('America/Sao_Paulo')
require('dotenv').config()
const {consoleErro} = require("./libs/utils/consoleUtils");
const options = require('./asset/config/options.json')
const {body} = require("./asset/library/body");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


    async function main() {
    try {
        const client = await createZoeBot("ZoeBot", null, null, null, options)
        await body(client)
    } catch (e) {
        consoleErro('WPP.CONNECT.API', e)
    }
}

function createZoeBot(botName, catchQR, statusFind, onLoadingScreen, options) {
    return new Promise((resolve, reject) => {
        wpp.create(botName, catchQR, statusFind, onLoadingScreen, options)
            .then((client) => {
                resolve(client)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

main().then(r => r).catch(e => consoleErro('MAIN', e))

/**
 * UserName: ktcg2x10gaami2bazc19
 * PassWord-DB: pscale_pw_wyu5NtPK9HgmYgiZregXRN21CZmkdwM7P6dUQ4bPxbz
 * PassWord: main-2023-12-31-fdfrai
 */