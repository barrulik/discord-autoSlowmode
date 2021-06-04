/**
 * Module Imports
 */
const Discord = require("discord.js");
const config = require("./config.json");

var channelData = [];

const client = new Discord.Client({ disableMentions: "everyone" });

client.login(config.token).then(() => {
  setInterval(async function () {
    updateSlowmode(client);
  }, 60 * 1000)
})


/**
 * Client Events
 */

client.on("ready", () => {
  console.log(`${client.user.username} is ready!`);
});


client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */



client.on("message", async (msg) => {
  if (msg.author.bot) return;

  let channel = channelData.find(c => c.id === msg.channel.id);
  if (!channel){
    channelData.push({"id":msg.channel.id, "messageCount": 1});
  } else {
    channel.messageCount++;
  }

  return;
});



async function updateSlowmode(client) {
  for (c of channelData){
    client.channels.cache.get(c.id).setRateLimitPerUser(Math.floor(c.messageCount/2));
    c.messageCount = 0;
  }
}