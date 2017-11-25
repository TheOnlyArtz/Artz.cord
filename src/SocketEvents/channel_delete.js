const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));

/**
* Emits when a channel gets deleted
* @event Client#Channel_Delete
* @param {GuildTextChannel|VoiceChannel|GroupDM|DMChannel} deletedChannel The deleted channel
*/
class ChannelDelete extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    const channel = this.client.channels.get(packet.id);
    this.client.channels.delete(packet.id);
    this.client.emit('Channel_Delete', channel)
  }
}

module.exports = ChannelDelete
