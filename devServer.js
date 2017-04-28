const path = require('path');
const express = require('express');

// webpack
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');

// firebase
const firebase = require('firebase');
const firebaseConfig = require('./firebase');
const serviceAccount = require('./fb-movie-night-service-account.json');

const request = require('request');
const colors = require('colors');
const app = express();
const compiler = webpack(webpackConfig);

let user = firebase.auth().currentUser;

console.log(user, ' user');

// console.log(user, 'LOGGED IN USER');

require('dotenv').config();

// const createFirebaseToken = (slackID) => {
//   // The uid we'll assign to the user.
//   const uid = `slack:${slackID}`;
//   console.log(uid);
//   // Create the custom token.
//   return firebase.auth().createCustomToken(uid);
// }

app.use(webpackDevMiddleware(compiler, {
  path: path.resolve(__dirname, "/public/build"),
  index: 'index.html'
}));

// app.get('/auth', function(req, res) {
//   res.json({ test: 'successful!' });
// });

app.use(webpackHotMiddleware(compiler));

// app.use(express.static(__dirname + '/public'));

// app.use(function(req, res) {
  // console.log(req, 'REQ from app.use');
  // console.log(res, 'RES from app.use');
  // res.sendFile(__dirname + '/public/index.html');
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/auth', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/auth/redirect', (req, res) => {
    const options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+process.env.SLACK_CLIENT_ID+
            '&client_secret='+process.env.SLACK_CLIENT_SECRET+
            '&redirect_uri='+process.env.SLACK_REDIRECT_URI,
        method: 'GET'
    };
    request(options, (error, response, body) => {
        const JSONresponse = JSON.parse(body)
        console.log(colors.yellow(JSON.stringify(JSONresponse)), 'JSONresponse');
        if (!JSONresponse.ok){
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        }else{
            console.log(colors.red(JSONresponse.access_token));

            const firebaseToken = createFirebaseToken(JSONresponse.user.id);

            console.log(firebaseToken, ' firebaseToken');

            // base.post(`users/${JSONresponse.user.id}`, {
            //   data: {
            //     name: JSONresponse.user.name, 
            //     avatar: JSONresponse.user.image_32
            //   },then(err){
            //     if(!err){
            //       res.redirect('/');
            //       user = JSONresponse.user.name;
            //       console.log(colors.green(user), 'user in I am not an error section');
            //     }
            //   }
            // });

        };
    });
});

app.listen(3333, () => {
  console.log("Listening on port 3333!");
});