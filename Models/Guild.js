const Structure = require('./Structure.js');
const constants = require('../Constants.js');
const GuildMember = require('./GuildMember.js');
const Constants = new constants();
const Box = require('./Box.js')

const GuildRolesCaching = require('./Caching/GuildRolesCaching.js');
const GuildEmojisCaching = require('./Caching/GuildEmojisCaching.js');
const GuildMembersCaching = require('./Caching/GuildMembersCaching.js');
const GuildChannelsCaching = require('./Caching/GuildChannelsCaching.js');
const GuildPresenceCaching = require('./Caching/GuildPresenceCaching.js');

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
		this.features = new Box(data.features);

		this.widgetChannelID = data.widget_channel_id;
		this.mfaLevel = data.mfa_level;
		this.widgetEnabled = data.widget_enabled;
		this.large = data.large;
		this.unavailable = data.unavailable;
		this.memberCount = data.member_count;

		this.applicationID = data.application_id;
		this.voiceStates = data.voice_states;
		this.systemChannelID = this.system_channel_id;

		this.channels = new GuildChannelsCaching(client, data.channels);
		this.roles = new GuildRolesCaching(client, this, data.roles);
		this.emojis = new GuildEmojisCaching(client, this, data.emojis);
		this.members = new GuildMembersCaching(client, this, data.members);
		this.presences = new GuildPresenceCaching(client, data.presences);
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
		return this.client.APIManager.makeRequest('post', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.channels.create(this.id), options);
	}

	/**
	*
	*
	*
	*
	*/
	async deleteChannel(snowflake) {
		if (!options) {
			throw new Error('Please specify the channel ID you want to delete.');
		}
		return this.client.APIManager.makeRequest('delete', Constants.ENDPOINTS_CHANNELS.delete(snowflake));
	}

	/**
	* Lets you change guild's name
	* @param {String} name
	* @returns {Promise}
	* @async
	* @example
	* Guild.changeName('ArtzyCordROCKS');
	*/
	async changeName(name) {
		if (!name instanceof String) {
			throw new TypeError('A name can\'t be something else than a string.');
		}
		const payload = {
			name: name
		};
			try {
				const res = await this.client.APIManager.makeRequest('patch', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.modify(this.id), payload);
				return this.client.guilds.get(res.id) ? this.client.guilds.get(res.id) : new Guild(this.client, res)
			} catch (e) {
				throw e
			}
	}

	/**
	* Lets you delete a guild
	* @async
	* @example
	* Guild.delete()
	*/
	async delete() {
			this.client.APIManager.makeRequest('delete', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.delete(this.id))
				.catch(e => {return e});
	}

/**
* Lets you ban a GuildMember via Snowflake
* @param {String} Snowflake
* @param {Number} days
* @param {String} reason
* @returns {Promise}
* @async
* @example
* // bans a guild member
* Guild.banMember("xxxxxxxxxxx",7, 'Reason, Because I can?');
*/
 async banMember(snowflake, days, reason) {
		if (!snowflake) throw new Error('Can\'t complete the ban, please supply a member\'s ID.');
		if (options.days) {
				options = {
					"delete-message-days": options.days
				}
		}
				this.client.APIManager.makeRequest('put', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.bans.create(this.id, snowflake), options)
					.catch(e => {return e})
	}

/**
* Lets you unban a GuildMember via Snowflake
* @param {String} Snowflake
* @async
* @example
* // Unban a user
* Guild.unbanMember("xxxxxxxxxxx");
*/
 async unbanMember(snowflake) {
		if (!snowflake) throw new Error('Can\'t complete the unban, please supply a member\'s ID.');
		const res = this.client.APIManager.makeRequest('delete', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.bans.remove(this.id, snowflake)).catch(e => {
			throw e
		})
	}

	getMember(id) {
		return this.members.get(id) ? this.members.get(id) : new GuildMember(this.client, id);
	}

	get guildIcon() {
		return this.client.APIManager.endpoints.CDN.icons(this.id, this.icon);
	}


	patchRaw(guild) {
		this.id = guild.id;

		this.name = guild.name;
		this.icon = guild.icon;
		this.splash = guild.splash;
		this.ownerID = guild.owner_id;
		this.region = guild.region;

		this.afkChannelID = guild.afk_channel_id;
		this.afkTimeout = guild.afk_timeout;
		this.embedEnabled = guild.embed_enabled;

		this.verificationLevel = Constants.GUILD_VERIFICATION_LEVEL[guild.verification_level];
		this.defaultMessageNotifications = Constants.GUILD_DEFAULT_MSG_NOTIFICATION[guild.default_message_notifications]; // TODO: Some work
		this.embedChannelID = guild.embed_channel_id ? guild.embed_channel_id : this.embedChannelID;
		this.explicitContentFilter = Constants.GUILD_EXPLICIT_CONTENT_FILTERS[guild.explicit_content_filter];
		this.features = guild.features;
		this.mfaLevel = Constants.GUILD_MFA_LEVEL[guild.mfa_level];

		this.widgetChannelID = guild.widget_channel_id ? guild.widget_channel_id : this.widgetChannelID
		this.widgetEnabled = guild.widget_enabled ? guild.widget_enabled : this.widgetEnabled;
		this.large = guild.large;
		this.unavailable = guild.unavailable;

		this.memberCount = guild.member_count ? guild.member_count : this.memberCount;
		this.voiceStates = guild.voice_states;
		this.channels = guild.channels;
		this.systemChannelID = guild.system_channel_id ? guild.system_channel_id : this.systemChannelID;

		this.roles = new GuildRolesCaching(this.client, this, guild.roles ? guild.roles : this.roles.array());
		this.emojis = new GuildEmojisCaching(this.client, this, guild.emojis ? guild.emojis : this.emojis.array());
		this.members = new GuildMembersCaching(this.client, this, guild.members ? guild.members : this.members.array());
		this.presences = new GuildPresenceCaching(this.client, guild.presences ? guild.presences : this.presences.array());
	}
}

module.exports = Guild;
