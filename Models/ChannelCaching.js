/*
  Cache channels preventing API spam
*/
const path = require('path');

const GuildTextChannel = require(path.join(__dirname, '..', 'Models', 'GuildTextChannel.js'));

class ChannelCaching {
	constructor(client, iterable) {
		this.iterable = iterable;
		Object.defineProperty(this, 'client', {value: client});
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

		return this.filterThroughTypes(initObj);
	}

	filterThroughTypes(data) {
		const that = this;
		switch (data.type) {
			case 0:
				return new GuildTextChannel(that.client, data);
				break;
			case 1:
				 // TODO: DM channel structure.
				break;
			case 2:
				 // TODO: VoiceChannel structure.
				break;
			case 3:
				 // TODO: Group DM structure.
				break;
			case 4:
				 // TODO: Channel Category structure.
				break;
		}
	}

}

module.exports = ChannelCaching;
