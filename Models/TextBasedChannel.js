const Structure = require('./Structure.js');
const Snowflake = require('../Util/Snowflake.js');
const constants = require('../Constants.js');
const Constants = new constants();
const EmbedMessage = require('../EmbedMessage.js');
class TextBasedChannel extends Structure {
	constructor(client, channel) {
		super(client);
		this.id = channel.id;
		this.type = channel.type;
		this.guildID = channel.guildID || null;
		this.lastMessageID = channel.lastMessageID || channel.last_message_id;
		this.createdTimestamp = Snowflake.deconstruct(this.id).timestamp;
	}

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
					 resolve(res);
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
				}

				try {
					let res = await that.client.APIManager.makeRequest(
						'post',
						 Constants.ENDPOINTS_CHANNELS.messages.create(this.id),
						 payload
					 );
					 resolve(res);
				} catch (e) {
					reject(e)
				}


			}
		})
	}
}

module.exports = TextBasedChannel;
