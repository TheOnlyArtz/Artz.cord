const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Message = require(path.join(__dirname, '..', 'Models', 'Message.js'));

/**
* Emits when a message gets updated
* @event Client#Message_Update
* @param {Message} newMessage The new message
* @param {Message} oldMessage The old message
*/
class MessageUpdate extends Basic {
  constructor(client) {
    super(client);
  }

  handle(packet) {
    const channel = this.client.channels.get(packet.channel_id)
    const exists = channel.messages.get(packet.id)
    const oldMessage = exists ? exists : null
    channel.messages.set(packet.id, new Message(this.client, packet))
    const newMessage = channel.messages.get(packet.id)
    this.client.emit('Message_Update', newMessage, oldMessage)
  }
}

module.exports = MessageUpdate
