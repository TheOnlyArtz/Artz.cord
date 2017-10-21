const path = require('path');

const Guild = require(path.join(__dirname, '..', 'Models', 'Guild.js'));
const GuildChannel = require(path.join(__dirname, '..', 'Models', 'GuildChannel.js'));
module.exports = class Message {
	constructor(client, data) {
		this.tts = data.tts;
		this.createdTimestamp = data.timestamp;
		this.pinned = data.pinned;
		this.nonce = data.nonce;
		this.content = data.content;
		this.id = data.id;
		this.channelID = data.channel_id; // TODO: Make it new TextChannel
		this.author = data.author;
		this.mentions = data.mentions || [];
		this.roleMentions = data.roleMentions || [];
		this.attachments = data.attachments || [];
		this.embeds = data.embeds || [];
		this.guild = client.guilds.get(client.channels.get(this.channelID).guildID);
		this.channel = new GuildChannel(client, client.channels.get(this.channelID));
	}
};
