path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
Message = require(path.join(__dirname, '..', 'Models', 'Message.js'));

class MessageCreateEvent extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    MessageHandler = new Message(this.client, packet);
    this.client.emit('Message_Create', MessageHandler);

module.exports = MessageCreateEvent
