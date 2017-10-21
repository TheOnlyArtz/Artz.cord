/*
  Cache channels preventing API spam
*/
const path = require('path');

const GuildChannel = require(path.join(__dirname, '..', 'Models', 'GuildChannel.js'));

class ChannelCaching {
	constructor(client, iterable) {
		this.iterable = iterable;
		this.client = client;
	}

	_cache() {
		const that = this;
		this.iterable.forEach(i => {
			i.channels.forEach(o => {
				that.client.channels.set(o.id, that._cachingObj(o, i));
			});
		});
	}

	_cachingObj(data, guildData) {
		const type = data.type;

		const initObj = {
			guildID: guildData.id,
			type: data.type,
			topic: data.topic,
			position: data.position,
			permissionOverwrites: data.permission_overwrites,
			parentChannelID: data.parent_id,
			nsfw: data.nsfw,
			name: data.name,
			lastMessageID: data.last_message_id,
			id: data.id
		};

		return new GuildChannel(this.client, initObj);
	}

}

module.exports = ChannelCaching;
