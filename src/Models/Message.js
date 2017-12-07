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
const EmbedMessage = require(path.join(__dirname, '..', 'EmbedMessage.js'));
/*******/

/**
* A Message Structure meant to control over messages properties and methods
* @extends Structure
* @param {Client} client Artzycord's Client instance
* @param {Object} data A valid Message data Object
*/
class Message extends Structure{
	constructor(client, data) {
		super(client);
		this.tts = data.tts;
		this.createdTimestamp = data.timestamp;
		this.pinned = data.pinned;
		this.nonce = data.nonce;
		this.content = data.content;
		this.embeds = new Box;
		this.id = data.id;
		this.channelID = data.channel_id;
		this.editedTimestamp = data.edited_timestamp
		this.attachments = new MessageAttachmentCaching(client, this, data.attachments);
		this.mentions = new MessageMentionCaching(client, this, data.mentions, data.mention_roles, data.mention_everyone);
		this.guild = client.channels.has(this.channelID) || client.channels.get(this.channelID).guildID ? client.guilds.get(client.channels.get(this.channelID).guildID) : null
		this.author = client.users.get(data.author.id) ? client.users.get(data.author.id) : new User(client, data.author);
		this.channel = client.channels.get(this.channelID);

		data.embeds.forEach(embed => {
			this.embeds.set(embed.type, embed)
		})
	};

	// TODO: Docorize it

	/**
	* Answer the message author AKA mention him
	* @param {String} content Message's content
	* @returns {Promise<Message>}
	* @example
	* // *Someone sent a message*
	* message.answer('HEYO!') // -> Sent "@Mention HEYO!"
	*/
	async answer(content, options) {
			try {
				let message = await this.channel.send(`${this.author}, ${content}`, options);
				return message;
			} catch (e) {
				throw e;
			}
	}

	/**
	* Delete a message that was sent
	* @param {Number} timeout Timeout of when the message will get deleted (in milliseconds)
	* @returns {Promise<Message>}
	* @example
	* message.channel.send('Message')
	*		.then(msg => {msg.delete()})
	*		.catch(e => console.error(e))
	*/
	delete(timeout) {
		const endpoint = this.client.APIManager.endpoints.ENDPOINTS_CHANNELS.messages.delete(this.channel.id, this.id)
		if (!timeout || typeof timeout !== 'number') this.client.APIManager.makeRequest('delete', endpoint);
		if (timeout && typeof timeout === 'number') {
			setTimeout(() => {
				this.client.APIManager.makeRequest('delete', endpoint);
			}, timeout)
		}
	}

	/**
	* Edit a message
	* @param {String|EmbedMessage} content Message's new content
	* @param {Object} options
	* @param {String} [options.markup = null] Message's markup
	* @returns {Promise<Message>}
	* @example
	* message.channel.send('Message')
	*		.then(msg => {msg.edit('Edited it :D')})
	*		.catch(e => console.error(e))
	*/
	async edit(content, options) {
		let payload;
		const endpoint = this.client.APIManager.endpoints.ENDPOINTS_CHANNELS.messages.edit(this.channel.id, this.id);
		if (content instanceof EmbedMessage) {
			payload = {
				embed: message
			};
		} else {
			if (options && options.markup) {
				content = `\`\`\`${options.markup}\n${content}\`\`\``
			}
			payload = {
				content: content,
			}
		}
		try {
			let res = await this.client.APIManager.makeRequest('patch', endpoint, payload)
			return(new Message(this.client, res))
		} catch (e) {
			throw e;
		}
	}

	_patch(data) {
		let client = this.client;
		this.tts = data.tts || this.tts;
		this.createdTimestamp = data.timestamp || this.createdTimestamp;
		this.pinned = data.pinned || this.pinned;
		this.nonce = data.nonce || this.nonce;
		this.content = data.content || this.content;
		this.id = data.id;
		this.embeds = data.embeds ? new Box : this.embeds
		this.channelID = data.channel_id;
		this.guild = client.channels.has(this.channelID) || client.channels.get(this.channelID).guildID ? client.guilds.get(client.channels.get(this.channelID).guildID) : null
		this.channel = client.channels.get(this.channelID);
		this.attachments = new MessageAttachmentCaching(client, this, data.attachments) || this.attachments;
		this.mentions = new MessageMentionCaching(client, this, data.mentions, data.mention_roles) || this.mentions;

		if (data.author) {
			this.author = client.users.get(data.author.id) ? client.users.get(data.author.id) : new User(client, data.author);
		} else {
			this.author = this.author
		}

		data.embeds.forEach(embed => {
			this.embeds.set(embed.type, embed)
		})

	}
}

module.exports = Message;
