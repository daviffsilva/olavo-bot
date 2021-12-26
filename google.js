const {google} = require('googleapis');
const googleconfig = require('./google-config.json');
const http = require('http');
const opn = require('open');
const destroyer = require('server-destroy');
const fs = require('fs');

let oauth = new google.auth.OAuth2(
                googleconfig.clientid,
                googleconfig.secret,
                googleconfig.callbackURI
            );
let refresh_token = googleconfig.token;
let requiredScopes = ['https://www.googleapis.com/auth/classroom.courses.readonly', 'https://www.googleapis.com/auth/classroom.coursework.me'];
let classroom;

module.exports = {
    getCourses: async () => {
        return new Promise(async (res, rej) => {
            if(refresh_token){
                oauth.setCredentials({
                    refresh_token: refresh_token
                });
            }else{
                this.authenticate(requiredScopes)
                .then(c => {
                    oauth = c;
                    return this.courses;
                })
                .catch(console.error);
            }
    
            classroom = google.classroom({
                version: 'v1',
                auth: oauth
            });

            const data = await classroom.courses.list({
                courseStates: 'ACTIVE'
            }).catch(rej);

            res(data.data.courses);
        });
    },

    getWorkByCourseId: (id) => {
        return new Promise((res, rej) => {
            if(!classroom){
                classroom = google.classroom({
                    version: 'v1',
                    auth: oauth
                });
            }
            let data = classroom.courses.courseWork.list({
                courseId: id,
                orderBy: 'updateTime desc'
            }).then(data => {
                res(data.data.courseWork);
            }).catch(rej);
        });
    },

    authenticate: async (scopes) => {
        return new Promise((resolve, reject) => {
            const elurl = oauth.generateAuthUrl({
                access_type: 'offline',
                scope: scopes.join(' ')
            });
            console.log(elurl);
            const server = http.createServer(async (req, res) => {
                try{
                    if (!!1) {
                        const qs = new URL(req.url, 'http://localhost:3000').searchParams;
                        res.end('Sucesso!');
                        server.destroy();
                        const {tokens} = await oauth.getToken(qs.get('code'));
                        oauth.credentials = tokens; // eslint-disable-line require-atomic-updates
                        //console.log(tokens);
                        resolve(oauth);
                      }
                } catch (e) {
                    reject(e);
                }
            })
            .listen(3000, () => {
                // open the browser to the authorize url to start the workflow
                opn(elurl, {wait: false}).then(cp => cp.unref());
            });
            destroyer(server);
        });
    },

    
}