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
const ChannelCaching = require('./Caching/ChannelCaching.js');

/**
* A Guild Structure meant to control over Guild properties and methods
* @extends Structure
* @param {Client} client ArtzyCord's Client instance
* @param {Object} data A valid Guild data Object
*
* @property {String} id Guild's ID
* @property {String} name Guild's name
* @property {String} icon Guild's icon code
* @property {String} splash Guild's splash
*
* @property {String} ownerID Guild's ownerID
* @property {String} region Guild's server region
* @property {Number} afkTimeout Guild's AFK timeout (Seconds)
* @property {Boolean} embedEnabled Whether Guild's embed is enabled or not
* @property {Number} verificationLevel Guild's verificationLevel
*
* @property {Number} defaultMessageNotifications Guild's default message notifications level
* @property {String} embedChannelID Guild's embed channel ID
* @property {Number} explicitContentFilter Guild's content filter level
* @property {Box} features A box of String instances contains Guild's features
*
* @property {String} widgetChannelID Guild's WidgetChannel's ID
* @property {Number} mfaLevel Guild's MFA level
* @property {Boolean} widgetEnabled Whether widget is enabled or not
* @property {Boolean} large Whether the Guild is large or not
* @property {Boolean} unavailable Wheter the Guild is unavailable or not
* @property {Number} memberCount Guild's member count
*
* @property {Box<TextBasedChannel|CategoryChannel|VoiceChannel>} channels A Box of GuildChannel instances
* @property {Box<Role>} roles A Box of GuildRoles instances
* @property {Box<Emoji>} emojis A Box of Emoji instances
* @property {Box<GuildMember>} members A Box of GuildMember instances
* @property {Box<Presence>} presences A Box of Presence instances
*
* @property {String} applicationID Guild's app ID
* @property {Array} voiceStates An array of the Guild's voice states
* @property {TextBasedChannel} systemChannel A channel where all the users can access
* @property {VoiceChannel} afkChannel A channel where AFK people go into
*/
class Guild extends Structure {
	constructor(client, data) {
		super(client);
		this.id = data.id;
		this.name = data.name;
		this.icon = data.icon;
		this.splash = data.splash;

		this.ownerID = data.owner_id;
		this.region = data.region;
		this.afkTimeout = data.afk_timeout;
		this.embedEnabled = data.embed_enabled;
		this.verificationLevel = data.verification_level;

		this.defaultMessageNotifications = data.default_message_notifications;
		this.embedChannelID = data.embed_channel_id;
		this.explicitContentFilter = data.explicit_content_filter;
		this.features = new Box

		data.features.forEach(e => {
			this.features.set(e, e)
		})

		this.widgetChannelID = data.widget_channel_id;
		this.mfaLevel = data.mfa_level;
		this.widgetEnabled = data.widget_enabled;
		this.large = data.large;
		this.unavailable = data.unavailable;
		this.memberCount = data.member_count;

		this.channels = new GuildChannelsCaching(client, data.channels);
		this.roles = new GuildRolesCaching(client, this, data.roles);
		this.emojis = new GuildEmojisCaching(client, this, data.emojis);
		this.members = new GuildMembersCaching(client, this, data.members);
		this.presences = new GuildPresenceCaching(client, data.presences);

		this.applicationID = data.application_id;
		this.voiceStates = data.voice_states;
		this.systemChannel = this.channels.get(data.system_channel_id) || null;
		this.afkChannel = this.channels.get(data.afk_channel_id) || null;
	}

	/**
	* @param {Object} options The options keys
	* @param {String} [options.name] Channel's name
	* @param {String} [options.type] Channel type, options: text, voice
	* @param {Number} [options.bitrate] Channel's bitrate (VOICE ONLY)
	* @param {Number} [options.user_limit] Channel's user limit (VOICE ONLY)
	* @param {Array<PermissionOverwrites>} [options.permission_overwrites] Channel's Permission overwrites
	* @param {Boolean} [options.nsfw] If the channel will be nsfw or not
	* @returns {Promise<GuildChannel>} Returns a GuildChannel object
	*/
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

		switch (options.type) {
			case 'text' || 0:
					options.type = 0
				break;
			case 'voice' || 2:
					options.type = 2
				break;
		}

		let channelToReturn = null;

		try {
			let request = await this.client.APIManager.makeRequest('post', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.channels.create(this.id), options)
			channelToReturn = new ChannelCaching(this.client).filterThroughTypesRAWDATA(request)
			return channelToReturn
		} catch (e) {
			throw e;
		}
	}

	/**
	* Delete a GuildChannel via snowflake
	* @param {String} snowflake channel's ID
	* @returns {Promise}
	* @example
	* GuildChannel.deleteChannel('xxxxxxxxxxx')
	*		.catch(e => console.error(e));
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
	* @returns {Promise} The promise returns a Guild object
	* @async
	* @example
	* Guild.changeName('ArtzyCordROCKS')
	*		.then(guild => console.log(`NEW NAME: ${guild.name}`))
	*	.catch(e => console.error(e));
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
	* 	.catch(e => console.error(e))
	*/
	async delete() {
			this.client.APIManager.makeRequest('delete', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.delete(this.id))
				.catch(e => {return e});
	}

/**
* Lets you ban a GuildMember via a Snowflake
* @param {String} Snowflake the user's ID
* @param {Number} days The amount of days messages will be deleted
* @param {String} reason The reason
* @returns {Promise} Returns GuildMember Object (The banned member)
* @example
* // bans a guild member
* Guild.banMember("xxxxxxxxxxx",7, 'Reason, Because I can?')
*		.then(user => console.log(`Banned ${user.username}`))
* 	.catch(e => console.error(e));
*/
 async banMember(Snowflake, days, reason) {
		if (!Snowflake) throw new Error('Can\'t complete the ban, please supply a member\'s ID.');
				let options = {
					"delete-message-days": days || 0,
					reason: reason || null
				}
				try {
					let member = this.members.get(Snowflake)
					let request = await this.client.APIManager.makeRequest('put', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.bans.create(this.id, Snowflake), options)
					return member;
				} catch (e) {
					throw e;
				}
	}

/**
* Lets you unban a GuildMember via Snowflake
* @param {String} Snowflake A member's ID
* @async
* @example
* // Unban a user
* Guild.unbanMember("xxxxxxxxxxx")
*		.catch(e => console.error(e));
*/
 async unbanMember(snowflake) {
		if (!snowflake) throw new Error('Can\'t complete the unban, please supply a member\'s ID.');
		const res = this.client.APIManager.makeRequest('delete', this.client.APIManager.endpoints.ENDPOINTS_GUILDS.bans.remove(this.id, snowflake)).catch(e => {
			throw e
		})
	}

	/**
	* Get a GuildMember Object via member's Snowflake
	* @param {String} Snowflake The member's Snowflake
	* @returns {GuildMember} Returns a GuildMember Object
	* @example
	* Guild.getMember('xxxxxx');
	*/
	getMember(Snowflake) {
		return this.members.get(Snowflake) ? this.members.get(Snowflake) : new GuildMember(this.client, Snowflake);
	}

	/**
	* @readonly
	* @returns {String} Returns guildIcon URL
	*/
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

		return this
	}
}

module.exports = Guild;
