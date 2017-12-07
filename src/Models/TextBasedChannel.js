const Structure = require('./Structure.js');
const Snowflake = require('../Util/Snowflake.js');
const constants = require('../Constants.js');
const Constants = new constants();
const EmbedMessage = require('../EmbedMessage.js');
const Box = require('./Box.js');
const Message = require('./Message.js')
/**
* A TextBasedChannel Structure meant to control over TextBasedChannel properties and methods
* @extends Structure
* @param {Client} client ArtzyCord's Client instance
* @param {Object} channel A valid Text based channel data Object
* @property {String} id Channel's ID
* @property {Box} messages Box which contains message instances
* @property {Number} type Channel's type
* @property {String} guildID Channel's Guild ID
* @property {String} lastMessageID Channel's last message ID
* @property {Date} createdTimestamp When the channel has been created
*/
class TextBasedChannel extends Structure {
	constructor(client, channel) {
		super(client);
		this.id = channel.id;
		this.messages = new Box;
		this.type = channel.type;
		this.guildID = channel.guildID || null;
		this.lastMessageID = channel.lastMessageID || channel.last_message_id;
		this.createdTimestamp = Snowflake.deconstruct(this.id).timestamp;
	}

	/**
	* Send a text Message to a text channel channel
	* @param {String} message The actual message content
	* @param {Object} options The options keys
	* @param {Boolean} [options.tts = false] Whether the message will be tts or not
	* @param {String} [options.markup = null] What codeblock markup the message will get
	* @example
	* // Send a message with markup
	* Chnnael.send('Test 123', {markup: "xl"})
	* // Send a tts message
	* Channel.send('Text to speech', {tts: true});
	*/
	async send(message, options) {
		const that = this;
		return new Promise(async (resolve, reject) => {
			if (message instanceof EmbedMessage) {

				let payload = {
					embed: message,
				};

				try {
					let res = await that.client.APIManager.makeRequest(
						'post',
						 Constants.ENDPOINTS_CHANNELS.messages.create(this.id),
						 payload
					 );
					 resolve(new Message(that.client, res));
				} catch (e) {
					reject(e)
				}
			} else {
				let content = message;
				if (options && options.markup) {
					content = `\`\`\`${options.markup}\n${content}\`\`\``
				}

				const payload = {
					content: content,
					tts: options && options.tts ? options.tts : null
				}

				try {
					let res = await that.client.APIManager.makeRequest(
						'post',
						 Constants.ENDPOINTS_CHANNELS.messages.create(this.id),
						 payload
					 );
					 resolve(new Message(that.client, res));
				} catch (e) {
					reject(e)
				}
			}
		})
	}
}

module.exports = TextBasedChannel;
