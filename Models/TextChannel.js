const {get, put, patch, post} = require('snekfetch');

class TextChannel {
	constructor(client, data) {
		this.type = data.type;
		this.id = data.id;
		this.guildID = data.guildID;
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

	createInviteLink(options) {
		let that = this;
		return new Promise(async (resolve, reject) => {

			if (!options instanceof Object) {
					reject('ERROR: The invite options must come in an object.');
			}
			
			try {

				let res = await that.client.APIManager.makeRequest(
					'post',
					 that.client.APIManager.endpoints.ENDPOINTS_CHANNELS.invites.create(that.id),
					 options
				 );

				resolve(res);
			} catch (e) {
				reject(e);
			}

		});
	}

}

module.exports = TextChannel;
