const {
    checkGroupByIdFromDatabase,
    createGroupFromDatabase,
    removeGroupByIdFromDatabase
} = require("../../database/dbGroups")

const {createText, dataMsgConsole} = require("../../../utils/utilsManager");
const {updateParticipantsByGroupIdFromMemberControl} = require("./memberControl");
const {memberWelcomeFromTools} = require("../../../tols/welcome");
const dataMsg = dataMsgConsole('US')

module.exports = {
    registerGroupFromEventRegisterGroup: async (msg, type = "msg", client) => {
        const numberHost = "5511997811703@c.us"
        const allNumbersEvent = msg.who

        if (type === "msg") {
            const {isGroupMsg, chat} = msg
            const groupId = isGroupMsg ? chat.groupMetadata.id : ""
            const groupName = chat.contact.name
            const members = await client.getGroupMembers(groupId)
            const group_registered = await checkGroupByIdFromDatabase(groupId)

            if (isGroupMsg) {
                if (!group_registered) await createGroupFromDatabase(groupId, groupName, members)
            }
        } else if (type === "add") {
            const groupEventId = msg.groupId

            const allChats = await client.listChats()
            const allGroups = allChats.filter(chat => chat.isGroup)

            if (numberHost === allNumbersEvent[0]) {
                let allChats = await client.listChats()
                let allGroups = allChats.filter(chat => chat.isGroup)

                const group_registered = await checkGroupByIdFromDatabase(groupEventId)

                if (!group_registered) {
                    for (let group of allGroups) {
                        const groupId = group.id._serialized

                        if (groupEventId === groupId) {
                            const groupName = group.contact.name

                            const message = createText(dataMsg.events.geral.entry_group, groupName)

                            const members = await client.getGroupMembers(groupId)
                            const membersIds = members.map(memberId => memberId.id._serialized)

                            await createGroupFromDatabase(groupEventId, groupName, membersIds)
                            return await client.sendText(groupEventId, message)
                        }
                    }
                }
            }

            for (let group of allGroups) {
                const groupId = group.id._serialized

                if (groupId.includes(groupEventId)) {
                    const groupName = group.contact.name
                    const members = await client.getGroupMembers(groupId)

                    const group_registered = await checkGroupByIdFromDatabase(groupId)
                    if (!group_registered) await createGroupFromDatabase(groupId, groupName, members)
                }
            }
            await memberWelcomeFromTools(client, allNumbersEvent[0], msg)
            await updateParticipantsByGroupIdFromMemberControl(client)
        } else if (type === "remove") {
            const groupId = msg.groupId

            if (numberHost === allNumbersEvent[0]) {
                await removeGroupByIdFromDatabase(groupId)
                return await client.deleteChat(groupId)
            }
            await updateParticipantsByGroupIdFromMemberControl(client)
        } else if (type === "inicio") {
            let allChats = await client.listChats()
            let allGroups = allChats.filter(chat => chat.isGroup)

            for (let group of allGroups) {
                const groupId = group.id._serialized
                const groupName = group.contact.name
                const members = await client.getGroupMembers(groupId)
                const membersIds = members.map(memberId => memberId.id._serialized)

                const group_registered = await checkGroupByIdFromDatabase(groupId)
                if (!group_registered) await createGroupFromDatabase(groupId, groupName, membersIds)
            }
        }
    }
}