/*
  Cache channels preventing API spam
*/
const path = require('path');

const GuildTextChannel = require(path.join(__dirname, '..', 'GuildTextChannel.js'));
const DMChannel = require(path.join(__dirname, '..', 'DMChannel.js'));
const VoiceChannel = require(path.join(__dirname, '..', 'VoiceChannel.js'));
const GroupDM = require(path.join(__dirname, '..', 'GroupDM.js'));
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

		if (data.type === 0) {
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
		} else if (data.type === 2) {
			const initObj = {
				guildID: guildData.id,
				type: data.type,
				position: data.position,
				permissionOverwrites: data.permission_overwrites,
				parentChannelID: data.parent_id,
				bitrate: data.bitrate,
				userLimit: data.user_limit,
				nsfw: data.nsfw,
				name: data.name,
				id: data.id
			};
			return this.filterThroughTypes(initObj);
		}

	}

	filterThroughTypes(data) {
		const that = this;
		switch (data.type) {
			case 0:
				return this.client.channels.set(data.id, new GuildTextChannel(that.client, data));
				break;
			case 1:
				 return this.client.channels.set(data.id, new DMChannel(that.client, data));
				break;
			case 2:
				 return this.client.channels.set(data.id, new VoiceChannel(that.client, data));
				break;
			case 3:
				 return this.client.channels.set(data.id, new GroupDM(that.client, data));
				break;
			case 4:
				 // TODO: Channel Category structure.
				break;
		}
	}

}

module.exports = ChannelCaching;
