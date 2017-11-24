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
const Structure = require(path.join(__dirname, '..', 'Models', 'Structure.js'));
/*******/

/**
* A Message Structure meant to control over messages properties and methods
* @extends Structure
* @param client Artzycord's Client instance
* @param data A valid Message data Object
*/
module.exports = class Message extends Structure{
	constructor(client, data) {
		super(client);
		this.tts = data.tts;
		this.createdTimestamp = data.timestamp;
		this.pinned = data.pinned;
		this.nonce = data.nonce;
		this.content = data.content;
		this.id = data.id;
		this.channelID = data.channel_id;
		this.guild = client.channels.has(this.channelID) || client.channels.get(this.channelID).guildID ? client.guilds.get(client.channels.get(this.channelID).guildID) : null
		this.author =client.users.get(data.author.id) ? client.users.get(data.author.id) : new User(client, data.author);
		this.channel = client.channels.get(this.channelID);
		this.attachments = new MessageAttachmentCaching(client, this, data.attachments);
		this.mentions = new MessageMentionCaching(client, this, data.mentions, data.mention_roles);
		// this.embeds = new Box(data.embeds);
	};

	_patch(message) {
		this.tts = data.tts;
		this.createdTimestamp = data.timestamp;
		this.pinned = data.pinned;
		this.nonce = data.nonce;
		this.content = data.content;
		this.id = data.id;
		this.channelID = data.channel_id;
		this.guild = client.channels.has(this.channelID) || client.channels.get(this.channelID).guildID ? client.guilds.get(client.channels.get(this.channelID).guildID) : null
		this.author =client.users.get(data.author.id) ? client.users.get(data.author.id) : new User(client, data.author);
		this.channel = client.channels.get(this.channelID);
		this.attachments = new MessageAttachmentCaching(client, this, data.attachments);
		this.mentions = new MessageMentionCaching(client, this, data.mentions, data.mention_roles);

	}
}
