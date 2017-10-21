const {get, put, patch, post} = require('snekfetch');

class TextChannel {
	constructor(client, data) {
		this.type = data.type;
		this.guildID = data.guild_id;
		this.name = data.name;
		this.position = data.position;
		this.permissionOverwrites = data.permission_overwrites;
		this.nsfw = data.nsfw;
		this.topic = data.topic;
		this.lastMessageID = this.last_message_id;
		this.parentMessageID = data.parent_id;

		this.client = client;
		this.data = data;
	}

  // Get name() {
  //   if (this.name) {
  //     return this.name;
  //   } else {
  //     return 'Unknown';
  //   };
  // };

}

module.exports = TextChannel;
