class Constants {
	constructor() {
		this.HTTP = {
			url: 'https://discordapp.com/api',
			version: '7'
		};

		this.VERSION = '0.0.1';

		this.GUILD_MFA_LEVEL = {
			0: 'NONE',
			1: 'ELEVATED'
		}

		this.PERMISSIONS = {
			CREATE_INSTANT_INVITE: 1 << 0,
			KICK_MEMBERS: 1 << 1,
			BAN_MEMBERS: 1 << 2,
			ADMINISTRATOR: 1 << 3,
			MANAGE_CHANNELS: 1 << 4,
			MANAGE_GUILD: 1 << 5,
			ADD_REACTIONS: 1 << 6,
			VIEW_AUDIT_LOG: 1 << 7,

			VIEW_CHANNEL: 1<< 10,
			SEND_MESSAGE: 1 << 11,
			SEND_TTS_MESSAGES: 1 << 12,
			MANAGE_MESSAGES: 1 << 13,
			EMBED_LINKS: 1 << 14,
			ATTACH_FILES: 1 << 15,
			READ_MESSAGE_HISTORY: 1 << 16,
			MENTIONS_ONLY: 1 << 17,
			USE_EXTERNAL_EMOJIS: 1 << 18,

			CONNECT: 1 << 20,
			SPEAK: 1 << 21,
			MUTE_MEMBERS: 1 << 22,
			DEAFEN_MEMBERS: 1 << 23,
			MOVE_MEMBERS: 1 << 24,
			USE_VAD: 1 << 25,

			CHANGE_NICKNAME: 1 << 26,
			MANAGE_NICKNAMES: 1 << 27,
			MANAGE_ROLES: 1 << 28,
			MANAGE_WEBHOOKS: 1 << 29,
			MANAGE_EMOJIS: 1 << 30,
		}

		this.GUILD_VERIFICATION_LEVEL = {
			0: 'NONE',
			1: 'VEREFIED_MAIL',
			2: 'REGISTERED_ABOVE_FIVE_MINUTES',
			3: 'MEMBER_ABOVE_TEN_MINUTES',
			4: 'PHONE_VERIFICATION'
		}

		this.GUILD_DEFAULT_MSG_NOTIFICATION = {
			0: 'EVERYTHING',
			1: 'MENTIONS_ONLY'
		}

		this.GUILD_EXPLICIT_CONTENT_FILTERS = {
			0: 'NONE',
			1: 'MEMBERS_WITHOUT_ROLES',
			2: 'EVERY_MEMBER'
		}
		let CDN_URL = 'https://cdn.discordapp.com/'
		this.CDN = {
			url: 'https://cdn.discordapp.com/',
			emojis: id => `emojis/${id}.png`,
			icons: (id, splash) => CDN_URL + `icons/${id}/${splash}.png`,
			splashes: (id, splash) => CDN_URL + `splashes/${id}/${splash}.png`,
			defaultAvatar: discriminator => CDN_URL + `embed/avatars/${discriminator}.png`,
			userAvatar: (id, avatar, format) => CDN_URL + `avatars/${id}/${avatar}.${format}`,
			appIcon: (id, icon) => CDN_URL + `app-icons/${id}/${icon}.png`
		};

		this.ENDPOINTS_CHANNELS = {
			get: id => `channels/${id}`,
			modify: id => `channels/${id}`,
			delete: id => `channels/${id}`,
			messages: {
				list: id => `channels/${id}/messages`,
				get: (ChannelID, MessageID) => `channels/${ChannelID}/messages/${MessageID}`,
				create: id => `channels/${id}/messages`,
				delete: (CID, MID) => `channels/${CID}/messages/${MID}`,
				edit: (CID, MID) => `channels/${CID}/messages/${MID}`,
				bulkDelete: (CID) => `channels/${CID}/messages/bulk-delete`
			},
			reactions: {
				create: (id, Mid, emoji) => `channels/${id}/messages/${Mid}/${emoji}/@me`,
				delete: (id, Mid, emoji) => `channels/${id}/messages/${Mid}/${emoji}/@me`,
				deleteUser: (id, Mid, userID) => `/channels/${id}/messages/${Mid}/reactions/${emoji}/${userID}`,
				get: (id, Mid, emoji) => `channels/${id}/messages/${Mid}/reactions/${emoji}`,
				deleteAll: (id, Mid) => `channels/${id}/messages/${Mid}/reactions`
			},
			permissions: {
				edit: (id, overwrite) => `channels/${id}/permissions/${overwrite}`,
				delete: (id, overwrite) => `channels/${id}/permissions/${overwrite}`
			},
			invites: {
				create: id => `channels/${id}/invites`,
				list: id => `channels/${id}/invites`
			},
			edit: (id, Mid) => `channels/${id}/messages/${Mid}`,
			delete: (id, Mid) => `channels/${id}/messages/${Mid}`,
			bulkDelete: id => `channels/${id}/messages/bulk-delete`,
			typing: id => `channels/${id}/typing`,
			pins: {
				add: (id, Mid) => `channels/${id}/pins/${Mid}`,
				list: id => `channels/${id}/pins`,
				delete: (id, Mid) => `channels/${id}/pins/${Mid}`
			},
			DMgroup: {
				add: (id, userID) => `channels/${id}/recipients/${userID}`,
				remove: (id, userID) => `channels/${id}/recipients/${userID}`
			}
		};

		this.ENDPOINTS_GUILDS = {
			get: id => `guilds/${id}`,
			delete: id => `guilds/${id}`,
			modify: id => `guilds/${id}`,
			channels: {
				list: id => `guilds/${id}/channels`,
				create: id => `guilds/${id}/channels`,
				modifyPos: id => `guilds/${id}/channels`
			},
			members: {
				get: (id, mID) => `guilds/${id}/members/${mID}`,
				add: (id, mID) => `guilds/${id}/members/${mID}`,
				modify: (id, mID) => `guilds/${id}/members/${mID}`,
				list: id => `guilds/${id}/members/`,
				modifyCurrentNickname: (id, mID) => `guilds/${id}/members/@me/nick`,
				addRole: (id, mID, rID) => `guilds/${id}/members/${mID}/roles/${rID}`,
				removeRole: (id, mID, rID) => `guilds/${id}/members/${mID}/roles/${rID}`,
				remove: (id, mID, rID) => `guilds/${id}/members/${mID}`
			},
			bans: {
				list: id => `guilds/${id}/bans`,
				remove: (id, mID) => `guilds/${id}/bans/${mID}`,
				create: (id, mID) => `guilds/${id}/bans/${mID}`
			},
			roles: {
				create: id => `guilds/${id}/roles`,
				modifyPositions: id => `guilds/${id}/roles`,
				list: id => `guilds/${id}/roles`,
				modify: (id, rID) => `guilds/${id}/roles/${rID}`,
				delete: (id, rID) => `guilds/${id}/roles/${rID}`
			},
			prune: {
				begin: id => `guilds/${id}/prune`,
				count: idea => `guilds/${id}/prune`
			},
			voice: {
				regions: id => `guilds/${id}/regions`
			},
			invites: {
				list: id => `guilds/${id}/invites`
			},
			integrations: {
				create: id => `guilds/${id}/integrations`,
				list: id => `guilds/${id}/integrations`,
				modify: (id, iID) => `guilds/${id}/integrations/${iID}`,
				delete: (id, iID) => `guilds/${id}/integrations/${iID}`,
				sync: (id, iID) => `guilds/${id}/integrations/${iID}`
			},
			embed: {
				get: id => `guilds/${id}/embed`,
				modify: id => `guilds/${id}/embed`
			},
			audit_logs: id => `guilds/${id}/audit-logs`
		};

		this.ENDPOINTS_EMOJIS = {
			list: id => `guilds/${id}/emojis`,
			get: (id, eID) => `guilds/${id}/emojis/${eID}`,
			add: id => `guilds/${id}/emojis`,
			modify: (id, eID) => `guilds/${id}/emojis/${eID}`,
			delete: (id, eID) => `guilds/${id}/emojis/${eID}`
		};
	}

}

module.exports = Constants;
