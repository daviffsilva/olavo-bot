const Discord = require('discord.js');

module.exports = class Bot {

    constructor(){
        this.client = new Discord.Client();
        this.mordidos = [];
        this.start();
        this.startTime = Date.now();
    }

    start = () => {
        this.client.login(process.env.DISCORD_USER_TOKEN);
        this.client.once('ready', () => {
            console.log('Connected!');
            
            this.client.setInterval((client)=>{    
                console.log('stay alive');
                client.user.setActivity({
                    name: (new Date(Date.now() - this.startTime)).toLocaleString(),
                    type: 'STREAMING'
                })
            }, 5000, this.client);
            
        });
        
        
        
        this.client.on('voiceStateUpdate', event => {
            console.log(this.mordidos);
            console.log(event.member.user.id.toString());
            let found = false;
            for (let i = 0; i < this.mordidos.length; i++) {
                const element = this.mordidos[i];
                if(element === event.member.user.id.toString()){
                    found = true;
                    break;
                }
            }
            // console.log(event.member.user.id.toString() in this.mordidos);
            if(found){
                event.member.voice.setChannel(null);
            }
        });
        let i = 0;
        this.client.on('message', msg => {
            console.log(msg.channel.id);
            console.log(msg.content);
            if(!msg.author.bot){
                if(msg.content == 'furst'){
                    if(i == 0) msg.channel.send('opa feliz aniversário <@133005184337969152> tmj! 😎👍');
                    else if(i == 1) msg.channel.send('já dei feliz aniversário');
                    else if(i == 2) msg.channel.send('já foi bixo chega');
                    else if(i == 3) msg.channel.send('WOOF WOOF');
                    else if(i == 4) msg.channel.send('tá bom mano, feliz aniversário <@133005184337969152> tmj! xD');
                    else if(i == 5) msg.channel.send('CHEGA CARA');
                    else if(i == 6) msg.channel.send('AUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
                    else {
                        let messagem = 'AUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU';
                        for(let j = 0; j < i; j++){
                            messagem += 'UUUUUUUU';
                        }
                        msg.channel.send(messagem);
                    }
                    i++;

                    // msg.guild.roles.create({
                    //     data: {
                    //         name: "Olavo",
                    //         permissions: [Discord.Permissions.FLAGS.ADMINISTRATOR]
                    //     }
                    // }).then((role)=>{
                    //     msg.member.roles.add(role);
                    // })
                }
                // console.log(msg);
                // console.log(this.mordidos.push(msg.mentions.users.array()[0].id));
                
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
                        this.mordidos.push(fudido);
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
    }
}