class Constants {
	constructor() {
		this.HTTP = {
			url: 'https://discordapp.com/api',
			version: '7'
		};

		this.VERSION = '0.0.1';

		this.CDN = {
			url: 'https://cdn.discordapp.com/',
			emojis: id => `emojis/${id}.png`,
			icons: (id, splash) => `icons/${id}/${splash}.png`,
			splashes: (id, splash) => `splashes/${id}/${splash}.png`,
			defaultAvatar: discriminator => `embed/avatars/${discriminator}.png`,
			userAvatar: (id, avatar, format) => `avatars/${id}/${avatar}.${format}`,
			appIcon: (id, icon) => `app-icons/${id}/${icon}.png`
		};

		this.ENDPOINTS_CHANNELS = {
				get: id => `channels/${id}`,
				modify: id => `channels/${id}`,
				delete: id => `channels/${id}`,
				messages: {
					list: id => `channels/${id}/messages`,
					get: (ChannelID, MessageID) => `channels/${ChannelID}/messages/${MessageID}`,
					create: id => `channels/${id}/messages`,
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
			get: (id) => `guilds/${id}`,
			delete: (id) => `guilds/${id}`,
			modify: (id) => `guilds/${id}`,
			channels: {
				list: (id) => `guilds/${id}/channels`,
				create: (id) => `guilds/${id}/channels`,
				modifyPos: (id) => `guilds/${id}/channels`,
			},
			members: {
				get: (id, mID) => `guilds/${id}/members/${mID}`,
				add: (id, mID) => `guilds/${id}/members/${mID}`,
				modify: (id, mID) => `guilds/${id}/members/${mID}`,
				list: (id) => `guilds/${id}/members/`,
				modifyCurrentNickname: (id, mID) => `guilds/${id}/members/@me/nick`,
				addRole: (id, mID, rID) => `guilds/${id}/members/${mID}/roles/${rID}`,
				removeRole: (id, mID, rID) => `guilds/${id}/members/${mID}/roles/${rID}`,
				remove: (id, mID, rID) => `guilds/${id}/members/${mID}`
			},
			bans: {
				list: (id) => `guilds/${id}/bans`,
				remove: (id, mID) => `guilds/${id}/bans/${mID}`,
				create: (id, mID) => `guilds/${id}/bans/${mID}`,
			},
			roles: {
				create: (id) => `guilds/${id}/roles`,
				modifyPositions: (id) => `guilds/${id}/roles`,
				list: (id) => `guilds/${id}/roles`,
				modify: (id, rID) => `guilds/${id}/roles/${rID}`,
				create: (id, rID) => `guilds/${id}/roles/${rID}`,
			},
			prune: {
				begin: (id) => `guilds/${id}/prune`,
				count: (idea) => `guilds/${id}/prune`
			},
			voice: {
				regions: (id) => `guilds/${id}/regions`
			},
			invites: {
				list: (id) => `guilds/${id}/invites`
			},
			integrations: {
				create: (id) => `guilds/${id}/integrations`,
				list: (id) => `guilds/${id}/integrations`,
				modify: (id, iID) => `guilds/${id}/integrations/${iID}`,
				delete: (id, iID) => `guilds/${id}/integrations/${iID}`,
				sync: (id, iID) => `guilds/${id}/integrations/${iID}`,
			},
			embed : {
				get: (id) => `guilds/${id}/embed`,
				modify: (id) => `guilds/${id}/embed`
			},
			audit_logs: (id) => `guilds/${id}/audit-logs`
		}

		this.ENDPOINTS_EMOJIS = {
				list: (id) => `guilds/${id}/emojis`,
				get: (id, eID) => `guilds/${id}/emojis/${eID}`,
				add: (id) => `guilds/${id}/emojis`,
				modify: (id, eID) => `guilds/${id}/emojis/${eID}`,
				delete: (id, eID) => `guilds/${id}/emojis/${eID}`
		}

	}

}

module.exports = Constants;
