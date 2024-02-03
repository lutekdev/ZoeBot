module.exports = {
    events: {
        inicio: {
            files_created: "✓ Seus arquivos foram criados com sucesso!",
            updated_participants: "✓ Seus participantes foram atualizados com sucesso!",
            added_participant: "✓ Novo participante foi adicionado com sucesso!",
            removed_participant: "✓ Participante {participant}, foi removido com sucesso!",
        },

        geral: {
            entry_group: `👋 Saudações a todos do grupo *{p1}*!\n\n👩🏻‍🦰 Sou a ZoeBot e estou aqui para ajudar.\n\nSe precisar de informações ou assistência, estou à sua disposição disposição.\n\nFique à vontade para interagir e curtir o grupo. 😊`,
            no_calls: "😪 Sinto muito, não posso atender chamadas no momento."
        }
    },

    private: {
        register: {
            member_not_registered: "× Você não está cadastrado em meu banco de dados, digite `register` para se cadastrar.",
            member_registered: "✓ você foi registrado em meu banco de dados.\n\n➸ *Nome*: {p1}\n➸ *Registrado em*: {p2}\n➸ *Serial*: {p3}\n\n*Nota:*\nNão compartilhe seu **'Serial'** para ninguém",
            member_already_registered: "✓ você está registrado em meu banco de dados.",
        }
    },

    erros: {
        commands: {
            cmd_not_found: "× Comando *{p1}* não foi encontrado.",
        }
    },

    commands: {
        info: {}
    }
}