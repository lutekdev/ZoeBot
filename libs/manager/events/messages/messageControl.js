const {fastParams} = require("../../../../asset/library/params")
const {
    checkMemberRegisteredByIdFromDatabase,
    createRegisterByMemberFromDatabase
} = require("../../database/dbRegister");
const {createText} = require("../../../utils/utilsManager");
const {checkCmdExists, dataCmdCategory} = require("../../../commands/commandsController");
const {consoleCmd} = require("../../../utils/consoleUtils");

module.exports = {
    checkMessageFromMessageControl: async (client, msg) => {
        const params = fastParams(client, msg)
        let message

        // PRIVADO LIBERADO OU NAO

        // GRUPO CADASTRADO

        // SE FOR MENSAGEM DE GRUPO E CASO O MEMBRO FOR BLOQUEADO

        const memberRegistered = await checkMemberRegisteredByIdFromDatabase(params.senderId)

        if (!params.isGroupMsg) {
            if (!memberRegistered) {
                if (params.body.includes('register')) {
                    const registerParams = [params.username, params.time, params.serial]
                    message = createText(params.regionMessages.private.register.member_registered, ...registerParams)

                    await createRegisterByMemberFromDatabase(params.senderId, params.username, params.time, params.serial)
                    await client.sendReactionToMessage(params.id, '✅')
                    await client.sendText(params.senderId, message)
                } else {
                    await client.sendReactionToMessage(params.id, '❌')
                    await client.sendText(params.senderId, params.regionMessages.private.register.member_not_registered)
                }
            } else {
                if (params.body.includes('register')) {
                    await client.sendReactionToMessage(params.id, '❌')
                    return await client.sendText(params.senderId, params.regionMessages.private.register.member_already_registered)
                }
            }
        }

        // if (params.body === "Boa Noite") {
        //     await client.sendReactionToMessage(params.id, '🌑')
        //     await client.sendText(params.from, "Boa Noite Querido! *❤*")
        // } else if (params.body !== "Boa Noite") {
        //     await client.sendReactionToMessage(params.id, "😒")
        //     await client.sendText(params.from, "Eitcha que nem sei o que diz 🤣")
        // }

        // MANDANDO MENSAGENS EM GRUPOS ESPECIFICOS
        // if (params.isGroupMsg) {
        //     const groups_ids = []
        //
        //     if (groups_ids.includes(params.chatId)) {
        //     }
        // }

        // CHAMANDO OS COMANDOS
        if (params.prefx) {
            if (memberRegistered) {
                if (checkCmdExists(params.commands)) {
                    await module.exports.handlerCommandExecute(client, msg)
                } else {
                    message = createText(params.regionMessages.erros.commands.cmd_not_found, params.commands)
                    await client.sendReactionToMessage(params.id, "❌")
                    await client.sendText(params.from, message)
                }
            } else {
                await client.sendText(params.from, "First register your account.")
            }
        }
    },

    handlerCommandExecute: async (client, msg) => {
        const params = fastParams(client, msg)
        const data = dataCmdCategory()

        console.log(data.cmdCategoryInfo.includes(params.commands))

        if (data.cmdCategoryInfo.includes(params.commands)) {
            consoleCmd(params.isGroupMsg, "INFO", params.commands, "#8ac46e", params.t, params.username, "TESTE")
            params.dataAllCmds[params.commands](client, msg, params.args)
        }
    }
}