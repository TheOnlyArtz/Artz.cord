const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Message = require(path.join(__dirname, '..', 'Models', 'Message.js'));
class MessageUpdate extends Basic {
  constructor(client) {
    super(client);
  }

  handle(packet) {
    const channel = this.client.channels.get(packet.channel_id)
    const exists = channel.messages.get(packet.id)
    channel.messages.set(packet.id, new Message(this.client, packet))
    const newOne = channel.messages.get(packet.id)
    this.client.emit('Message_Update', newOne, exists ? exists : null)
  }
}

module.exports = MessageUpdate
