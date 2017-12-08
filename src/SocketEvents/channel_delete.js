const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));

/**
* Emits when a channel gets deleted
* @event Client#channelDelete
* @param {GuildTextChannel|VoiceChannel|GroupDM|DMChannel} deletedChannel The deleted channel
*/
class ChannelDelete extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    const channel = this.client.channels.get(packet.id);
    if (channel) {
      this.client.channels.delete(packet.id);
      this.client.emit('channelDelete', channel)
    }
  }
}

module.exports = ChannelDelete
