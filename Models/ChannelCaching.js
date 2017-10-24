/*
  Cache channels preventing API spam
*/
const path = require('path');

const GuildTextChannel = require(path.join(__dirname, '..', 'Models', 'GuildTextChannel.js'));
const DMChannel = require(path.join(__dirname, '..', 'Models', 'DMChannel.js'));
class ChannelCaching {
	constructor(client, iterable) {
		this.iterable = iterable;
		Object.defineProperty(this, 'client', {value: client});
	}

	_cache() {
		const that = this;
		this.iterable.forEach(i => {
			i.channels.forEach(o => {
				that._cachingObj(o, i);
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
		// console.log(data);
		switch (data.type) {
			case 0:
				return this.client.channels.set(data.id, new GuildTextChannel(that.client, data));
				break;
			case 1:
				 return this.client.channels.set(data.id, new DMChannel(that.client, data))
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
