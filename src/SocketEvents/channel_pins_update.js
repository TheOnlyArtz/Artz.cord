const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const ChannelCaching = require(path.join(__dirname, '..', 'Models', 'Caching' , 'ChannelCaching.js'));

/**
* Emits when a message gets pinned
* @event Client#channelPinsUpdate
* @param {GuildTextChannel|VoiceChannel|GroupDM|DMChannel} channel The channel the message was pinned in.
* @param {Date} time The UNIX timestamp of the pin
*/
class ChannelPinsUpdate extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    const channel = this.client.channels.get(packet['channel_id']);
    if (channel) {
      const time = data['last_pin_timestamp'] ? new Date(time).getTime() : null
      this.client.emit('channelPinsUpdate', channel, time);
    }
  }
}
module.exports = ChannelPinsUpdate
