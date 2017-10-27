const Box = require('../Box.js');
class GuildsChannelsCaching {
  constructor(client, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.channels = new Box();
    this.ChannelCaching = require('./ChannelCaching.js');
    data.forEach(channel => {
      this.channels.set(channel.id, new this.ChannelCaching(client, channel).filterThroughTypes(channel));
    });
    return this.channels;
  }
}

module.exports = GuildsChannelsCaching
