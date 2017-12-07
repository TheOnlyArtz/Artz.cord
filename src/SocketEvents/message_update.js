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
    const channel = this.client.channels.get(packet.channel_id);
    if (channel) {
      const message = channel.messages.get(packet.id);
      if (message) {
        const oldMessage = Object.assign(Object.create(message), message);
        message._patch(packet);
        this.client.emit('Message_Update', message, oldMessage)
      }

    }

  }
}

module.exports = MessageUpdate
