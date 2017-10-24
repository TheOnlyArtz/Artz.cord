const Structure = require('./Structure.js');
const Snowflake = require('../Util/Snowflake.js');

class TextBasedChannel extends Structure {
	constructor(client, channel) {
		super(client);

		this.id = channel.id;
		this.type = channel.type;
		this.guildID = channel.guildID || null;
		this.lastMessageID = channel.lastMessageID || channel.last_message_id;
		this.createdTimestamp = Snowflake.deconstruct(this.id).timestamp;
	}
}

module.exports = TextBasedChannel;
