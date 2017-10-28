const path = require('path');

/* Caching */
const MessageMentionCaching = require(path.join(__dirname, '..', 'Models','Caching', 'MessageMentionCaching.js'));
const MessageAttachmentCaching = require(path.join(__dirname, '..', 'Models','Caching', 'MessageAttachmentCaching.js'));
const ChannelCaching = require(path.join(__dirname, '..', 'Models', 'Caching', 'ChannelCaching.js'));
/***********/

/* Structures */
const Guild = require(path.join(__dirname, '..', 'Models', 'Guild.js'));
const GuildChannel = require(path.join(__dirname, '..', 'Models', 'GuildTextChannel.js'));
const User = require(path.join(__dirname, '..', 'Models', 'User.js'));
/**************/

/* Util */
const Box = require(path.join(__dirname, '..', 'Models', 'Box.js'));
/*******/

module.exports = class Message {
	constructor(client, data) {
		this.tts = data.tts;
		this.createdTimestamp = data.timestamp;
		this.pinned = data.pinned;
		this.nonce = data.nonce;
		this.content = data.content;
		this.id = data.id;
		this.channelID = data.channel_id;
		this.guild = client.channels.has(this.channelID) || client.channels.get(this.channelID).guildID ? client.guilds.get(client.channels.get(this.channelID).guildID) : null
		this.author = new User(client, data.author);
		this.channel = client.channels.get(this.channelID)
		this.attachments = new MessageAttachmentCaching(client, this, data.attachments);
		this.mentions = new MessageMentionCaching(client, this, data.mentions, data.mention_roles);
		// this.embeds = new Box(data.embeds);

		// TODO: Figure out how to implement correctly
		// if (client.channels.has(this.channelID) && client.channels.get(this.channelID).guildID) {
		// 	this.author = client.guilds.get(client.channels.get(this.channelID).guildID).members.get(data.author.id)
		// } else {
		// 	this.author = new User(client, data.author);
		// }

	};
}
