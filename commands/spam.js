const Discord = require('discord.js');

let timerId;

module.exports = {
    name: 'Materias',
    description: 'Mostrar matérias para o usuário',
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
        if(args[0] === 'stop'){
            console.log('parado perdeu');
            clearInterval(timerId);
        }else if(args[0] === 'start'){
            timerId = setInterval(() => {
                console.log('cu');
                msg.channel.send('spam');
            }, 500);
        }
        msg.channel.startTyping();
        

        // msg.channel.send('spam')
        // .then(m => {
        //     msg.channel.stopTyping();
        // });
        
    }
}