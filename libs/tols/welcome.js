// const canvas = require('discord-canvas')
const {logger} = require("prompt");

module.exports = {
    memberWelcomeFromTools: async (client, member_id, msg) => {
        const memberPhotoServer = await client.getProfilePicFromServer(member_id)
        let memberPhoto = memberPhotoServer.eurl

        if (memberPhoto === undefined) {
            memberPhoto = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }

        const welcomePhoto = await new canvas.Welcome()
            .setUsername("Gentil")
            .setDiscriminator('0001')
            .setMemberCount('5')
            .setGuildName('ZoeBot')
            .setAvatar(memberPhoto)
            .setColor('border', '#00100C')
            .setColor('username-box', '#00100C')
            .setColor('discriminator-box', '#00100C')
            .setColor('message-box', '#00100C')
            .setColor('title', '#00FFFF')
            .setBackground('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBl372LUGLDq6U8kmcQKNGeQEhst865KqoxrHNXsbwdQ&s')
            .toAttachment()
        const base64 = `data:image/png;base64,${welcomePhoto.toBuffer().toString('base64')}`

        return await client.sendFile(msg.groupId, base64, '', 'Welcome')
    }
}