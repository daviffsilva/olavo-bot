const Discord = require('discord.js');

let banidos = [];


module.exports = {
    name: 'Materias',
    description: 'Mostrar matérias para o usuário',
    variables: {
        banidos: banidos
    },
    execute: msg => {
        msg.channel.startTyping();
        let args = msg.content.split(' ').slice(1);

        if(args.length === 0){
            msg.channel.send('fala direito fdp')
            .then(m => {
                msg.channel.stopTyping();
            });
            return;
        }
        banidos.push(args[0]);
        // console.log(msg.guild.members.get(820986014486364210));
        // console.log(msg.guild.members.ban(args[0]));
        msg.channel.send(JSON.stringify(banidos))
        .then(m => {
            msg.channel.stopTyping();
        });
        
    }
}