const Invite = require('./Invite.js');
const TextBasedChannel = require('./TextBasedChannel.js');

/**
* A GuildTextChannel Structure meant to control over GuildTextChannel properties and methods
* @extends TextBasedChannel
* @param {Client} client ArtzyCord's Client instance
* @param {Object} data A valid GuildTextChannel data Object
*/
class GuildTextChannel extends TextBasedChannel {
	constructor(client, data) {
		super(client, data);
		this.name = data.name;
		this.position = data.position;
		this.permissionOverwrites = data.permissionOverwrites || data.permission_overwrites || [];
		this.nsfw = data.nsfw || false;
		this.topic = data.topic;
		this.lastMessageID = data.lastMessageID || data.last_message_id || null;
		this.parentChannelID = data.parentChannelID || data.parent_id;
		Object.defineProperty(this, 'client', {value: client});
	}

	async createInviteLink(options) {
		const that = this;
		return new Promise(async (resolve, reject) => {
			if (!(options instanceof Object)) {
				reject('ERROR: The invite options must come in an object.');
			}

			try {
				const res = await that.client.APIManager.makeRequest(
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

module.exports = GuildTextChannel;
