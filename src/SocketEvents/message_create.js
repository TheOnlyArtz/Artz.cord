const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Message = require(path.join(__dirname, '..', 'Models', 'Message.js'));

/**
* Emits when a message gets created
* @event Client#Message_Create
* @param {Message} message The created message
*/
class MessageCreateEvent extends Basic {
  constructor(client) {
    super(client);
  }

  handle(packet) {
    const MessageHandler = new Message(this.client, packet);
    const channel = this.client.channels.get(packet.channel_id)
    channel.messages.set(MessageHandler.id, MessageHandler)
    this.client.emit('Message_Create', MessageHandler);
  }
}
module.exports = MessageCreateEvent
