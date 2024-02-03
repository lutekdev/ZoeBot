module.exports = {
    menuHome : () => {
        return `
══ 🔥 Bem-vindo(a) a *${process.env.BOT_NAME}* 🔥 ══        

Nome do Membro: *{p1}*

═════════════════
🔮 *Comandos Disponíveis* 🔮

• Selecione o emoji abaixo:

📢 - Anúncios
🔄 - Atualizações
🔗 - Links
🧩 - Utilidades
🎮 - Jogos
👥 - Grupos
🎲 - Jogos
🎭 - Figurinhas
⚙️ - Configurações

⏱ *Tempo de 5 Segundos para  Reagir*
════════════════
        
*${process.env.BOT_NAME.trim()}*® by *${process.env.OWNER_NAME.trim()}*`
    },

    menuUtils: (prefix) => {
        return `
═════════════════
🔮 *Comandos Disponíveis* 🔮

• Digite o comando com o prefixo:

${prefix}makecontact

═════════════════
*${process.env.BOT_NAME.trim()}*® by *${process.env.OWNER_NAME.trim()}*\`
        `
    }
}