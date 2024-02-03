const {fastParams} = require("../../../asset/library/params");

module.exports = async (client, msg, args) => {
    const params = fastParams(client, msg)

    const contact_number = args[0]
    const contact_member = args[1]

    function createContact(contact_number, contact_name) {
        const contact_id = contact_number + "@c.us"
        client.sendContactVcard(params.from, contact_id, contact_name)
    }

    console.log(contact_number)
    console.log(contact_member)
}