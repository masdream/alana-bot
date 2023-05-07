const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const GiveawaysManager = require("./Utils/giveaway");

const {Guilds, GuildMembers, GuildMessages, MessageContent, GuildVoiceStates, GuildMessageReactions} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember} = Partials;
require('dotenv').config()

const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify')

const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildVoiceStates, GuildMessageReactions],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

client.commands = new Collection();

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
});

client.giveawayManager = new GiveawaysManager(client, {
    default: {
      botsCanWin: false,
      embedColor: "#a200ff",
      embedColorEnd: "#550485",
      reaction: "🎉",
    },
});

module.exports = client;