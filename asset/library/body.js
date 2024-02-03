const {registerGroupFromEventRegisterGroup} = require("../../libs/manager/events/group/registerGroup");
const {updateParticipantsByGroupIdFromMemberControl} = require("../../libs/manager/events/group/memberControl");
const {dataMsgConsole, colorHex} = require("../../libs/utils/utilsManager");
const {checkMessageFromMessageControl} = require("../../libs/manager/events/messages/messageControl");
const dataMsg = dataMsgConsole('US')

module.exports = {
    body: async (client) => {
        await client.onAnyMessage(async (msg) => {
        });

        await client.onMessage(async (msg) => {
            await checkMessageFromMessageControl(client, msg)
        })

        await client.onIncomingCall(async (call) => {
            console.log(colorHex('#d63e3e', `[CALL] Incoming call from ${call.peerJid}`))

            await client.sendText(call.peerJid, dataMsg.events.geral.no_calls)
                .then(async () => {
                    await client.rejectCall(call.id)
                    await client.blockContact(call.peerJid)
                })
        })

        await client.onParticipantsChanged(async (event) => {
            await registerGroupFromEventRegisterGroup(event, event.action, client)
        })

        setTimeout(async () => {
            await registerGroupFromEventRegisterGroup("", "inicio", client)
            await updateParticipantsByGroupIdFromMemberControl(client)
            // VERIFICAR ARQUIVO ENV ADICIONAR TAMBÉM DEPOIS
        }, 15000)
    }
}