const path = require("path");
const moment = require("moment-timezone")
const phoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const {createSerial, firstLetterCapitalized} = require("../../libs/utils/utilsManager");
const config = require('../config/config.json')
const {MediaType} = require("@wppconnect-team/wppconnect");
const {loadAllCmds} = require("../../libs/commands/commandsController");

module.exports = {
    fastParams : (client, msg) => {
        /** Message */
        const {t, sender, chat, type, caption, id, chatId, body, isGroupMsg, from} = msg
        const {pushname, verifiedName, formattedName} = sender
        const username = pushname || verifiedName || formattedName
        const senderId = sender.id
        const time = moment(t * 1000).format('DD/MM/YYYY HH:mm:ss')
        const serial = createSerial(20)
        const expectedTypes = Object.values(MediaType)

        /** Variables */
        const numberOwner = process.env.OWNER_NUMBER.trim()
        const isOwner = numberOwner === senderId.replace(/@c.us/g, '')

        /** Members */
        const memberNumber = `+${senderId.split('@')[0]}`
        const memberNumberObject = phoneNumberUtil.parseAndKeepRawInput(memberNumber, 'ZZ');
        const regionCode = phoneNumberUtil.getRegionCodeForNumber(memberNumberObject);

        const messagesPath = path.resolve(__dirname, '../../messages/lang', regionCode)
        const regionMessages = require(messagesPath);

        const menuPath = path.resolve(__dirname, '../../messages/menus/lang/', regionCode)
        const menuMessages = require(menuPath)


        /** Commands */
        const prefix = config.prefix

        let prefx = ''

        prefix.forEach(p => {
            if (body.toLowerCase().startsWith(p.toLowerCase()) && !prefx) {
                if (!expectedTypes.includes(firstLetterCapitalized(type))) {
                    prefx = p
                }
            }
        })

        const commands = body.trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const dataAllCmds = loadAllCmds()

        return {
            /** Message */
            t: t,
            sender: sender,
            chat: chat,
            type: type,
            caption: caption,
            id: id,
            chatId: chatId,
            body: body,
            isGroupMsg: isGroupMsg,
            from: from,
            username: username,
            senderId: senderId,
            time: time,
            serial: serial,
            expectedTypes: expectedTypes,

            /** Variables */
            numberOwner: numberOwner,
            isOwner: isOwner,

            /** Members */
            memberNumber: memberNumber,
            regionMessages: regionMessages,
            menuMessages: menuMessages,

            /** Commands */
            commands: commands,
            args: args,
            prefx: prefx,
            dataAllCmds: dataAllCmds
        }
    }
}