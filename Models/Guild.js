const Structure = require('./Structure.js');
const constants = require('../Constants.js');
const Constants = new constants();
const GuildMember = require('./GuildMember.js');
const GuildRolesCaching = require('./Caching/GuildRolesCaching.js');
const GuildEmojisCaching = require('./Caching/GuildRolesCaching.js');
class Guild extends Structure {
	constructor(client, data) {
		super(client);
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
		this.roles = new GuildRolesCaching(client, data.roles);
		this.emojis = new GuildEmojisCaching(client, data.emojis);
		this.features = data.features;
		this.mfaLevel = data.mfa_level;
		this.widgetEnabled = data.widget_enabled;
		this.large = data.large;
		this.unavailable = data.unavailable;
		this.memberCount = data.member_count;
		this.voiceStates = data.voice_states;
		this.members = data.members;
		this.channels = data.channels;
		this.presences = data.presences;
	}

	async createChannel(options) {
		if (!options instanceof Object) {
			throw new TypeError('Channel properties must be inside an Object');
		}
		if (!options) {
			throw new Error('Cannot create a channel without it\'s properties.');
		}
		if (!options.name) {
			throw new Error('Please supply the name for the channel under the property of name.');
		}
		return this.client.APIManager.makeRequest('post', `/guilds/${this.id}/channels`, options);
	}

	async deleteChannel(snowflake) {
		if (!options) {
			throw new Error('Please specify the channel ID you want to delete.');
		}
		return this.client.APIManager.makeRequest('delete', Constants.ENDPOINTS_CHANNELS.delete(snowflake));
	}

	async changeName(name) {
		if (!name instanceof String) {
			throw new TypeError('A name can\'t be something else than a string.');
		}
		const payload = {
			name: name
		};

		const that = this;

		return new Promise(async (resolve, reject) => {
			try {
				const res = await that.client.APIManager.makeRequest('patch', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.modify(that.id), payload);
				resolve(new Guild(this.client, res));
			} catch (e) {
				reject(e);
			}
		});
	}

	async delete() {
		const that = this;
		return new Promise(async (resolve, reject) => {

			try {
				const res = await that.client.APIManager.makeRequest('delete', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.delete(that.id));
				resolve('Channel has been deleted successfuly');
			} catch (e) {
				reject(e);
			}

		});
	}

	async banMember(snowflake, options = {"delete-message-days": 0}) {
		const that = this;
		if (!snowflake) throw new Error('Can\'t complete the ban, please supply a member\'s ID.');

		if (options.days) {
				options = {
					"delete-message-days": options.days
				}
		}

		return new Promise(async (resolve, reject) => {

			try {
				const res = await that.client.APIManager.makeRequest('put', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.bans.create(that.id, snowflake), options);
				resolve('Ban has been created!');
			} catch (e) {
				reject(e);
			}

		});
	}

	async unbanMember(snowflake) {
		const that = this;
		if (!snowflake) throw new Error('Can\'t complete the unban, please supply a member\'s ID.');

		return new Promise(async (resolve, reject) => {

			try {
				const res = await that.client.APIManager.makeRequest('delete', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.bans.remove(that.id, snowflake));
				resolve('Ban has been created!');
			} catch (e) {
				reject(e);
			}

		});
	}

	getMember(id) {
		let filteredMember = this.members.filter(i => i.user.id === id)[0];
		return new GuildMember(this.client, filteredMember);
	}

}

module.exports = Guild;
