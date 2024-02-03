const prompt = require('prompt')
const fs = require('fs').promises
const path = require('path')
const {colorHex} = require("./utilsManager");

module.exports = {
    createFileEnv: async () => {
        let schema = {
            properties: {
                owner_number: {
                    description: colorHex("Enter your Number: "),
                    required: true
                },
            }
        }

        const {owner_number} = await prompt.get(schema)

        const env =
            "#############  BOT DATA #############\n" +
            "OWNER_NAME=Olivera Winicius\n" +
            "BOT_NAME=ZoeBot\n" +
            "STICKER_NAME=Created By Oliveira Winicius And ZoeBot\n" +
            "############ BOT SETTINGS #############\n" +
            "OWNER_NUMBER=" + owner_number + "\n" +
            "############ API'S SETTINGS #############\n" +
            "API_NEWS_ORG=??????\n" +
            "ACR_HOST=??????\n" +
            "ACR_ACCESS_KEY=??????\n" +
            "ACR_ACCESS_SECRET=??????\n" +
            "API_DEEPAK=??????\n" +
            "############ END DATA #############"

        await fs.writeFile(path.join('../../.env'), env, 'utf8')
    }
}