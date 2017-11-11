const Invite = require('./Invite.js');
const TextBasedChannel = require('./TextBasedChannel.js');

class GuildTextChannel extends TextBasedChannel {
	constructor(client, data) {
		super(client, data);
		this.name = data.name;
		this.position = data.position;
		this.permissionOverwrites = data.permissionOverwrites;
		this.nsfw = data.nsfw;
		this.topic = data.topic;
		this.lastMessageID = data.lastMessageID;
		this.parentChannelID = data.parentChannelID;
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

	patchRaw(channel) {
		this.name = channel.name ? channel.name : this.name || '';
		this.topic = channel.topic ? channel.topic : this.topic || '';
		this.nsfw = channel.nsfw ? channel.nsfw : this.nsfw || false;
		this.parentChannelID = channel.parent_id ? channel.parent_id : this.parentChannelID || null;
		this.position = channel.position ? channel.position : this.position || 0;

		// TODO: permissionOverwrites
	}
}

module.exports = GuildTextChannel;
