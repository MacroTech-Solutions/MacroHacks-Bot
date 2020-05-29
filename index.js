const Discord = require('discord.js');
var admin = require('firebase-admin');
var serviceAccount = require("./macrohacks-macrotech-firebase-adminsdk-ycmff-dc86532e3b.json");
var fs = require('fs');
// const { cli } = require('winston/lib/winston/config');

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://macrohacks-macrotech.firebaseio.com"
});

var database = admin.database();

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
});

// login to Discord with your app's token
client.login('NzEwMTc2NDQ2MjIzNDgzMDIx.XrwpZA.DhUEXWGgQxR1hmrJ2dryAxcaHao');

client.on('message', async (message) => {
  if (message.channel == "710182346640326807") {
    if (message.content == "!verify") {
      var userID = (message.author.username + '#' + message.author.discriminator);
      let myVal = await database.ref("participants").orderByChild('discord').equalTo(userID).once("value");
      myVal = myVal.val();
      if (myVal) {
        for (key in myVal) {
          message.author.send('Welcome to MacroHacks! Stay tuned in the <#710231157643673620> channel for updates.');
          message.guild.member(message.author).roles.add('710178968753537045');
          message.guild.member(message.author).setNickname(myVal[key].name);
        }
      } else {
        message.author.send("It seems like you are not registered for MacroHacks. Please sign up at https://macrohacks.tech. If you need help, please DM <@!374363009121910795>.");
      }
      message.delete();
    } else if(message.author.id != "710176446223483021") {
      message.delete();
    }
  } else if (message.content.startsWith("!send ") && (message.channel == "713767865165021313" || message.channel == "710190283312332980" || message.channel == "710167339416420393")) {
    let channelNum = message.content.split(" ")[1].substring(2, message.content.split(" ")[1].length - 1);
    let myMessage = message.content.substring(message.content.split(" ")[0].length + message.content.split(" ")[1].length + 2);
    client.channels.cache.get(channelNum).send(myMessage);
  }
});