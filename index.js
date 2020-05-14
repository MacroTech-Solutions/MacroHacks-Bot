var Discord = require('discord.io');
var logger = require('winston');
var admin = require('firebase-admin');
const path = require('path');
var serviceAccount = require("./macrohacks-macrotech-firebase-adminsdk-ycmff-dc86532e3b.json");
const PORT = process.env.PORT || 1024;

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://macrohacks-macrotech.firebaseio.com"
});

var database = admin.database();

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
  token: "NzEwMTc2NDQ2MjIzNDgzMDIx.XrwpZA.DhUEXWGgQxR1hmrJ2dryAxcaHao",
  autorun: true
});
bot.on('ready', function (evt) {
  logger.info('Connected');
});
bot.on('message', function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);
    if (channelID == "710182346640326807") {
      switch (cmd) {
        case 'verify':
          bot.sendMessage({
            to: channelID,
            message: 'Verifying...'
          });
          break;
      }
    }
    switch (cmd) {
      case 'status':
        bot.sendMessage({
          to: channelID,
          message: 'Active'
        });
        break;
    }
  }
});