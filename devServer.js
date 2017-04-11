const path = require('path');
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.dev");
const request = require('request');
const colors = require('colors');
const app = express();
const compiler = webpack(webpackConfig);
const base = require('./base');

// console.log(base, 'base');

require('dotenv').config();

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
  // console.log(colors.green(req.query), ' REQ from /auth/');
  // console.log(colors.red(res), ' RES from /auth/');
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
            // const token;
            console.log(colors.red(JSONresponse.access_token));
            // res.send("Success!");
            base.authWithCustomToken(JSONresponse.access_token, slackAuthHandler);
            return res.redirect('/');
            // res.send("Success! \n"+JSON.stringify(JSONresponse));
            // res.sendFile(__dirname + '/public/index.html');
        };
    });
});

const slackAuthHandler = (error, user) => {
  if (error) {
    // doSomethingWithError(error);
    console.log(error, 'error');
  } 
  // doSomethingWithAuthenticatedUser(user);
  console.log(user, 'user');
}

app.listen(3333, () => {
  console.log("Listening on port 3333!");
});