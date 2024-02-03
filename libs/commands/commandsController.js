const fs = require('fs')
const path = require("path");
const config = require('../../asset/config/config.json')
const commandsList = JSON.parse(fs.readFileSync(path.join(__dirname, '../../commands/commands.json'), 'utf-8'))
const aliasCmds = {
    // "ALIAS" : "COMMAND NAME"
}

module.exports = {
    dataCmdControl: (cmds) => {
        const dataAll = []
        const prefix = config.prefix

        cmds.map((cmd) => {
            prefix.map((p) => {
                dataAll.push(p + cmd)
            })
        })
        return dataAll
    },

    dataCmdCategory: () => {
        const cmdCategoryInfo = module.exports.dataCmdControl(commandsList.info)

        return {
            cmdCategoryInfo
        }
    },

    checkCmdExists: (command) => {
        const cmdInfo = module.exports.dataCmdControl(commandsList.info)

        return (
            (cmdInfo.includes(command))
        )
    },

    loadAllCmds: () => {
        const prefix = config.prefix

        const data = {}
        const dataPath = path.join(__dirname, '../../commands/global')

        function walkCmds(dir) {
            if (!fs.existsSync(dir)) return;

            const dirents = fs.readdirSync(dir);

            for (const dirent of dirents) {
                const pathToCheck = path.join(dir, dirent);
                const stats = fs.lstatSync(pathToCheck);

                if (stats.isDirectory()) {
                    walkCmds(pathToCheck);
                } else if (stats.isFile() && dirent.endsWith('.js')) {
                    const commandName = path.basename(pathToCheck, '.js');
                    const prefixedCommandName = prefix.map(p => p + commandName);
                    prefixedCommandName.forEach(name => {
                        data[name] = require(pathToCheck);
                    });

                    // Lidar com aliases
                    Object.keys(aliasCmds).forEach(alias => {
                        if (aliasCmds[alias] === commandName) {
                            const prefixedAlias = prefix.map(p => p + alias);
                            prefixedAlias.forEach(name => {
                                data[name] = require(pathToCheck);
                            });
                        }
                    });
                }
            }
        }

        walkCmds(dataPath)
        return data
    }
}