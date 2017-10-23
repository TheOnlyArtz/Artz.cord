const Invite = require('./Invite.js');
class TextChannel {
	constructor(client, data) {
		this.type = data.type;
		this.id = data.id;
		this.guildID = data.guildID;
		this.name = data.name;
		this.position = data.position;
		this.permissionOverwrites = data.permissionOverwrites;
		this.nsfw = data.nsfw;
		this.topic = data.topic;
		this.lastMessageID = data.lastMessageID;
		this.parentChannelID = data.parentChannelID;

		Object.defineProperty(this, 'client', { value: client });
	}

	async createInviteLink(options) {
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

				resolve(new Invite(that.client, res));
			} catch (e) {
				reject(e);
			}

		});
	}

}

module.exports = TextChannel;
