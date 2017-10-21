const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

// webpack
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');

// firebase
const firebase = require('firebase');
const firebaseConfig = require('./firebase');

// firebase admin
const serviceAccount = require('./fb-movie-night-firebase-adminsdk.json');
const admin = require("firebase-admin");
const adminConfig = {
   credential: admin.credential.cert(serviceAccount),
   databaseURL: firebaseConfig.config.databaseURL
};

const request = require('request');
const colors = require('colors');
const app = express();
const compiler = webpack(webpackConfig);
const cookieParser = require('cookie-parser');

require('dotenv').config();

const port = process.env.PORT || 3333;

// var
let slackAccessToken;
let userID;
let userName;
let userPic;
let firebaseToken;

app.use(cookieParser());

// parse application/json 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: firebaseConfig.config.databaseURL
});

app.use(webpackDevMiddleware(compiler, {
   path: path.resolve(__dirname, "/public/build"),
   headers: {
      "Access-Control-Allow-Origin": "http://localhost"
   },
   hot: true,
   lazy: false,
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

   request(options, (error, response, body) => {
       
      const JSONresponse = JSON.parse(body)
      
      console.log(colors.yellow(JSON.stringify(JSONresponse)), 'JSONresponse');
      
      if (!JSONresponse.ok){

         res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
      
      }else{

         slackAccessToken = JSONresponse.access_token;
         userID = JSONresponse.user.id;
         userName = JSONresponse.user.name;
         userPic = JSONresponse.user.image_32;
        
         admin.auth().createCustomToken(userID).then((customToken) => {

            const stringifiedToken = JSON.stringify(customToken);

            firebaseToken = stringifiedToken.replace(/\"/g, "");

            console.log(colors.red(userID, userName, userPic), ' userID, userName, userPic');
            
            res.redirect('/authenticated');

         });
      };
   });
});

router.get('/users', (req, res) => {
   res.json({ 
      message: 'Welcome to the coolest API on earth' ,
      userID: userID,
      userName: userName,
      userPic: userPic,
      slackAccessToken: slackAccessToken,
      firebaseToken: firebaseToken
   })
});

app.use('/api', router);

app.listen(port, () => {
   console.log("Listening on port 3333!");
});