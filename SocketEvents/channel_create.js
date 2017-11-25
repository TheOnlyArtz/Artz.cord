const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const ChannelCaching = require(path.join(__dirname, '..', 'Models', 'Caching' , 'ChannelCaching.js'));

class ChannelCreate extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    this.client.emit('Channel_Create');
    this.ChannelCaching = new ChannelCaching(this.client, packet).filterThroughTypes(packet)
  }
}
module.exports = ChannelCreate
