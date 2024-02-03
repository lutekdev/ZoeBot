const {
    checkParticipantExistByIdFromDatabase, updateParticipantsByIdFromDatabase,
} = require("../../database/dbGroups");
const {dataMsgConsole, colorHex} = require("../../../utils/utilsManager");
const dataMsg = dataMsgConsole('US')

module.exports = {
    checkParticipantExistByGroupIdFromMemberControl: async (msg) => {
        return await checkParticipantExistByIdFromDatabase(msg.chatId)
    },

    updateParticipantsByGroupIdFromMemberControl: async (client) => {
        const allChats = await client.listChats()
        const allGroups = allChats.filter(chat => chat.isGroup)

        for (const group of allGroups) {
            const groupId = group.id._serialized
            const members = await client.getGroupMembers(groupId)
            const membersIds = members.map(memberId => memberId.id._serialized)

            await updateParticipantsByIdFromDatabase(groupId, membersIds)
        }
        console.log(colorHex(dataMsg.events.inicio.updated_participants))
    }
}