const Discord = require("discord.js");
const client = new Discord.Client({
    fetchAllMembers: false,
    sync: false,
    disableEveryone: true
});

const config = require("./config.js");
const clean = require("./modules/Clean");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.username} whilst serving ${client.users.size} users.`);
    client.user.setActivity("LizcraveVlogz");
});

client.on("guildMemberAdd", (member) => {
    const channel = member.guild.channels.find(ch => ch.name === "meet-and-greet");
    if (!channel) return;

    channel.send(`Welcome to **${member.guild.name}**, ${member} please enjoy your stay!`);

    let joinRole = member.guild.roles.find(r => r.name === "Supporter");
    if (!joinRole) return;

    member.addRole(joinRole);
});

client.on("guildMemberRemove", (member) => {
    const channel = member.guild.channels.find(ch => ch.name === "meet-and-greet");
    if (!channel) return;

    channel.send(`Oh no! **${member.user.username}** has just left our server, we will miss them.`);
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();

    if (command === "upload") {
        if (message.author.id !== config.owner) return message.channel.send("You're unable to use this command because it is locked to Damian only.");

        const dataLink = args.join(" ");
        if (!dataLink) return message.channel.send("Please provide a link.");

        client.channels.get("527156144498540545").send(`<@&527154015809699847> Damian has just uploaded a new video, go check it out: ${dataLink}`);
        return message.channel.send("Upload notification has been sent successfully.");
    }
});

client.login(config.token);