/*
  Cache channels preventing API spam
*/
const path = require('path');

const GuildTextChannel = require(path.join(__dirname, '..', 'GuildTextChannel.js'));
const DMChannel = require(path.join(__dirname, '..', 'DMChannel.js'));
const VoiceChannel = require(path.join(__dirname, '..', 'VoiceChannel.js'));
const GroupDM = require(path.join(__dirname, '..', 'GroupDM.js'));
const ChannelCategory = require(path.join(__dirname, '..', 'CategoryChannel.js'));

const Box = require('../Box.js');
class GuildsChannelsCaching {
  constructor(client, channel) {
    Object.defineProperty(this, 'client', {value: client});
    this.channels = new Box();
    channel.forEach(channel => {
  		const that = this;
  		switch (channel.type) {
  			case 0:
  				return this.channels.set(channel.id, new GuildTextChannel(that.client, channel));
  				break;
  			case 1:
  				 return this.channels.set(channel.id, new DMChannel(that.client, channel));
  				break;
  			case 2:
  				 return this.channels.set(channel.id, new VoiceChannel(that.client, channel));
  				break;
  			case 3:
  				 return this.channels.set(channel.id, new GroupDM(that.client, channel));
  				break;
  			case 4:
            return this.client.channels.set(channel.id, new ChannelCategory(that.client, channel));
  				break;
        }
        });
    return this.channels;
  }
}

module.exports = GuildsChannelsCaching
