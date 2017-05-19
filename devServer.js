const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

// webpack
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');

// firebase
// const firebase = require('firebase');
const firebaseConfig = require('./firebase');

// firebase admin
const serviceAccount = require('./fb-movie-night-service-account.json');
const admin = require("firebase-admin");
const adminConfig = {
   credential: admin.credential.cert(serviceAccount),
   databaseURL: firebaseConfig.config.databaseURL
};

// firebase var
let firebaseToken;

const request = require('request');
const colors = require('colors');
const app = express();
const compiler = webpack(webpackConfig);
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(cookieParser());

// parse application/json 
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: firebaseConfig.config.databaseURL
});

app.use(webpackDevMiddleware(compiler, {
   path: path.resolve(__dirname, "/public/build"),
   index: 'index.html'
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
});

app.get('/authenticated', (req, res) => {
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

   console.log(req.cookies.state, ' req.cookies.state')

   request(options, (error, response, body) => {
      const JSONresponse = JSON.parse(body)
      console.log(colors.yellow(JSON.stringify(JSONresponse)), 'JSONresponse');
      if (!JSONresponse.ok){
         res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
      }else{

         const slackAccessToken = JSONresponse.access_token;
         const userID = JSONresponse.user.id;
         const userName = JSONresponse.user.name;
         const userPic = JSONresponse.user.image_32;

         console.log(req.body, ' req.body');
         // console.log(req.headers, 'req.headers')

         return admin.auth().createCustomToken(userID)
            .then((customToken) => {

               const stringifiedToken = JSON.stringify(customToken);



               console.log(stringifiedToken.replace(/\"/g, ""), ' customToken')

               res.render('/', {
                  slackAccessToken,
                  userID,
                  userName,
                  userPic 
               })

               // res.cookie('customToken', stringifiedToken.replace(/\"/g, ""));
               // // res.setHeader('customToken', customToken);
               
               // res.redirect('/');

            });
      };
   });
});


app.listen(3333, () => {
   console.log("Listening on port 3333!");
});