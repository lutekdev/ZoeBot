const path = require('path')
const fs = require('fs')
const {colorHex} = require("./utilsManager");

module.exports = {
    createFiles: async () => {
        const fileEnv = fs.existsSync(path.join('../../.env'))
        const moduleEnv = require('./envUtils')

        if (!fileEnv) {
            await moduleEnv.createFileEnv()
        } else {
            console.log(colorHex("The necessary files have already been created!", "#d63e3e"))
        }
    }
}

// module.exports.createFiles()