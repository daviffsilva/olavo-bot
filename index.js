const Discord = require('discord.js');
const config = require("./config.json");
const fs = require('fs');

const client = new Discord.Client();
const startTime = Date.now();


client.once('ready', () => {
	console.log('Ready!');
    // client.setInterval((client)=>{        
    //     // client.user.setActivity({
    //     //     name: (Date.now() - startTime).toLocaleString(),
    //     //     type: 'COMPETING'
    //     // }).catch(console.error)
    // }, 5000, client);
    
});

let fudidos = [];

client.on('voiceStateUpdate', event => {
    console.log(fudidos);
    console.log(event.member.user.id.toString());
    let found = false;
    for (let i = 0; i < fudidos.length; i++) {
        const element = fudidos[i];
        if(element === event.member.user.id.toString()){
            found = true;
            break;
        }
    }
    // console.log(event.member.user.id.toString() in fudidos);
    if(found){
        event.member.voice.setChannel(null);
    }
});

client.on('message', msg => {
    console.log(msg.channel.id);
    if(!msg.author.bot){
        // console.log(msg);
        // console.log(fudidos.push(msg.mentions.users.array()[0].id));
        
        // if(msg.channel.guild.id === '369008552280457216'){
        //     console.log(msg.content);
        // }

        // let role = msg.guild.me.roles.highest;
        // msg.guild.fetchWebhooks().then(console.log);
        // if(msg.content.startsWith('` 1 `') || msg.content.startsWith('` 2 `') || msg.content.startsWith('` 3 `')){
            
        // }
        // if(msg.channel.guild.id === '369008552280457216'){
        //     console.log(msg.content);
        // }
        
        

        if(msg.content.startsWith('olavo pega')){
            let mentionArray = msg.mentions.users.array();
            if(mentionArray.length === 0){
                msg.channel.send('porra faz direito né bixo');
            }else{
                let fudido = mentionArray[0].id;
                console.log(fudido);
                fudidos.push(fudido);
                msg.guild.members.fetch(fudido).then(member => {
                    member.voice.setChannel(null);
                });
                msg.channel.send('moidi :3');
            }
        }





        // let a = msg.guild.roles.cache.get('804893338033455155').members.map(v => [v.nickname]);
        // msg.guild.members.fetch().then(v => {
        //     console.log(v);
        //     v.filter(v => v.roles.cache.has('804893338033455155')).map(v => v.nickname);
        //     console.log(a);
        //     msg.channel.send(JSON.stringify(a));
        // });
        
        // if(msg.content.startsWith('eld materias')){
        //     require("./commands/materias").execute(msg);
        // }
        // if(msg.content.startsWith('bane')){
        //     require("./commands/banir").execute(msg);
        // }
        // if(msg.content.startsWith('bane2')){
        //     require("./commands/banir2").execute(msg);
        // }
        // if(msg.content.startsWith('spam')){
        //     require("./commands/spam").execute(msg);
        // }
        // if(msg.content.startsWith('opa vlw mano')){
        //     msg.channel.send('opa mano, suave :crocodile:');
        // }
        
        // if(msg.content.startsWith('bo noite ae mano')){
        //     msg.channel.send('o mano, bo noite');
        // }

        // if(msg.content.startsWith('mudanome')){
        //     let roles = [];
        //     msg.guild.members.fetch({query: 'SPC', force: true}).then(rls => {
        //         console.log(rls);
        //         roles = [...roles, ...rls];
        //     });

        //     console.log(roles);
        //     // msg.guild.roles.fetch('804893338033455155').then(role => {
        //     //     let members = role.members;
        //     //     members.map(v => {
        //     //         console.log(v);
        //     //     });
        //     // });
        //     // require("./commands/mudanome").execute(msg);
        // }

        // // msg.react('💩');
    }
});


client.login(config.token);

