const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const ChannelCaching = require(path.join(__dirname, '..', 'Models', 'Caching' , 'ChannelCaching.js'));

/**
* Emits when a channel gets created
* @event Client#Channel_Create
* @param {GuildTextChannel|VoiceChannel|GroupDM|DMChannel} channel The created channel
*/
class ChannelCreate extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    this.ChannelCaching = new ChannelCaching(this.client, packet).filterThroughTypes(packet)
    const newChannel = new ChannelCaching(this.client, packet).filterThroughTypesRAWDATA(packet)
    this.client.emit('Channel_Create', newChannel);
  }
}
module.exports = ChannelCreate
