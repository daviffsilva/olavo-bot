const Discord = require('discord.js');
const Banir = require('./banir');



module.exports = {
    name: 'Materias',
    description: 'Mostrar matérias para o usuário',
    execute: msg => {
        msg.channel.startTyping();
        console.log(Banir);
        msg.channel.send(JSON.stringify(Banir.variables.banidos || []))
        .then(m => {
            msg.channel.stopTyping();
        });
        
    }
}