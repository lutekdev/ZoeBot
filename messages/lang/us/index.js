module.exports = {
    events: {
        inicio: {
            files_created: "✓ Your Files Have Been Created Successfully!",
            updated_participants: "✓ Your Participants Have Been Updated Successfully!",
            added_participant: "✓ New Participant Has Been Added Successfully!",
            removed_participant: "✓ Participant {participant}, Has Been Removed Successfully!",
        },

        geral: {
            entry_group: `👋 Greetings to Everyone in the Group *{p1}*!\n\n👩🏻‍🦰 I'm ZoeBot, and I'm here to help.\n\nIf you need information or assistance, I'm at your disposal.\n\nFeel free to interact and enjoy the group. 😊`,
            no_calls: "😪 I'm sorry, I can't answer calls right now."
        },
    },

    private: {
        register: {
            member_not_registered: "× You are not registered in my database, type `register` to register.",
            member_registered: "✓ You have been registered in my database.\n\n➸ *Name*: {p1}\n➸ *Registered Time*: {p2}\n➸ *Serial*: {p3}\n\n*Note:*\nDo Not Share Your **'Serial'** to someone.",
            member_already_registered: "× You are already registered in my database.",
        }
    }
}