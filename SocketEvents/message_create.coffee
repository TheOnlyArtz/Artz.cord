path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
Message = require(path.join(__dirname, '..', 'Models', 'Message.js'));

class MessageCreateEvent extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    MessageHandler = new Message(this.client, packet);
    channel = this.client.channels.get(packet.channel_id)
    channel.messages.set(MessageHandler.id, MessageHandler)
    this.client.emit('Message_Create', MessageHandler);

module.exports = MessageCreateEvent
