const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => { //Actions for when bot becomes ready
    console.log("Client started");
    timer();
    function timer () {
        setTimeout(function () {
            timer()
        }, 300000)
    }
});

client.login(config.token);
