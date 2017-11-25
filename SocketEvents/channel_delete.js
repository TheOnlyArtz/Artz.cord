const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));

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
