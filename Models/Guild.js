const Structure = require('./Structure.js');
const constants = require('../Constants.js');
const Constants = new constants();
class Guild extends Structure{
	constructor(client, data) {
		super(client)
		this.id = data.id;
		this.name = data.name;
		this.icon = data.icon;
		this.splash = data.splash;
		this.ownerID = data.owner_id;
		this.region = data.region;
		this.afkChannelID = data.afk_channel_id;
		this.afkTimeout = data.afk_timeout;
		this.embedEnabled = data.embed_enabled;
		this.verificationLevel = data.verification_level;
		this.defaultMessageNotifications = data.default_message_notifications;
		this.embedChannelID = data.embed_channel_id;
		this.explicitContentFilter = data.explicit_content_filter;
		this.roles = data.roles; // TODO: Collection
		this.emojis = data.emojis; // TODO: Collection
		this.features = data.features;
		this.mfaLevel = data.mfa_level;
		this.widgetEnabled = data.widget_enabled;
		this.large = data.large;
		this.unavailable = data.unavailable;
		this.memberCount = data.member_count;
		this.voiceStates = data.voice_states;
		this.members = data.members; // TODO: collection
		this.channels = data.channels; // TODO: collection
		this.presence = data.presences; // TODO: Collection
	}

	async createChannel(options) {
		if (!options instanceof Object) throw new Error('Channel properties must be inside an Object');
		if (!options) throw new Error('Cannot create a channel without it\'s properties.');
		if (!options.name) throw new Error('Please supply the name for the channel under the property of name.');
		return this.client.APIManager.makeRequest('post', `/guilds/${this.id}/channels`, options)
	}

	async deleteChannel(snowflake) {
		if (!options) throw new Error('Please specify the channel ID you want to delete.');
		return this.client.APIManager.makeRequest('delete', Constants.ENDPOINTS_CHANNELS.delete(snowflake));
	}

	async changeName(name) {

		if (!name instanceof String) throw Error('A name can\'t be something else than a string.');
		let payload = {
				name: name,
		};

		let that = this;

		return new Promise(async (resolve, reject) => {

			try {
				let res = await that.client.APIManager.makeRequest('patch', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.modify(that.id), payload);
				resolve(new Guild(this.client, res));
			} catch (e) {
				reject(e);
			}

		});
	}
}

module.exports = Guild;
