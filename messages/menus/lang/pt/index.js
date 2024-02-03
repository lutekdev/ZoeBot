module.exports = {
    menuPrincipal : (prefix) => {
        return `
══ 🔥 Bem-vindo(a) a *${process.env.BOT_NAME}* 🔥 ══        
Membro: *{p1}*
═════════════════
💅🏻 *Menu de Comandos* 💅🏻

• Digite um comando em negrito abaixo:

• *Em Desenvolvimento* 👋
═════════════════
        
*${process.env.BOT_NAME.trim()}*® by *${process.env.OWNER_NAME.trim()}*`
    }
}