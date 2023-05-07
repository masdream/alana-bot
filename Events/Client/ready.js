const {Client, ActivityType} = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(process.env.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('MongoDB connection succesful.')
        }

        client.user.setPresence({ activities: [{ name: 'Ramadhan Kareem 🌙' }], status: 'idle' });

        console.log(`${client.user.username} is now online.`);
    },
};