const {fastParams} = require("../../../asset/library/params");
const {convertSecondsToMilliseconds} = require("../../../libs/utils/utilsManager");

module.exports = async (client, msg, args) => {
    const params = fastParams(client, msg)

    const timerClosing = setTimeout(() => {
        client.sendText(params.from, params.regionMessages.erros.commands.timers.time_closing)
    }, convertSecondsToMilliseconds(6))

    if (args.length === 1) {
        await client.sendReactionToMessage(params.id, "☕")

        client.sendText(params.from, params.menuMessages.menuHome())
            .then(r => {
                function handlerReactions() {
                    client.getReactions(r.id)
                        .then(async reactions => {
                            reactions.reactions.map(p => {
                                switch (p.aggregateEmoji) {
                                    case "📢":
                                        client.sendText(params.from, params.regionMessages.maintenance.menu_maintenance)
                                        clearTimeout(timerClosing)
                                        break
                                    case "🔄":
                                        client.sendText(params.from, params.regionMessages.maintenance.menu_maintenance)
                                        clearTimeout(timerClosing)
                                        break
                                    case "🔗":
                                        client.sendText(params.from, params.regionMessages.maintenance.menu_maintenance)
                                        clearTimeout(timerClosing)
                                        break
                                    case "🧩":
                                        client.sendText(params.from, params.menuMessages.menuUtils(params.prefx))
                                        clearTimeout(timerClosing)
                                        break
                                    case "🎮":
                                        client.sendText(params.from, params.regionMessages.maintenance.menu_maintenance)
                                        clearTimeout(timerClosing)
                                        break
                                    case "👥":
                                        client.sendText(params.from, params.regionMessages.maintenance.menu_maintenance)
                                        clearTimeout(timerClosing)
                                        break
                                    case "🎲":
                                        client.sendText(params.from, params.regionMessages.maintenance.menu_maintenance)
                                        clearTimeout(timerClosing)
                                        break
                                    case "🎭":
                                        client.sendText(params.from, params.regionMessages.maintenance.menu_maintenance)
                                        clearTimeout(timerClosing)
                                        break
                                    case "⚙️":
                                        client.sendText(params.from, params.regionMessages.maintenance.menu_maintenance)
                                        clearTimeout(timerClosing)
                                        break
                                }
                            })
                        })
                }

                setTimeout(() => {
                    handlerReactions()
                }, convertSecondsToMilliseconds(5))
            })
    }
}

/**
 * if (p.aggregateEmoji === "📢") {
 *                                     // client.sendText(params.from, "Testando Menu")
 *                                     // client.sendContactVcard(params.from, params.senderId, "Marquinhos do Jet")
 *
 *                                 // console.log(p)
 *                             })
 */