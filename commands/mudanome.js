const Discord = require('discord.js');

module.exports = {
    name: 'mudaNome',
    description: 'Mostrar matérias para o usuário',
    execute: msg => {
        msg.guild.members.fetch(console.log).catch(console.error);   
    }
}