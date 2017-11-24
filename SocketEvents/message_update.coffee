path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
Message = require(path.join(__dirname, '..', 'Models', 'Message.js'));
class MessageUpdate extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    channel = this.client.channels.get(packet.channel_id)
    exists = channel.messages.get(packet.id)
    channel.messages.set(packet.id, new Message(this.client, packet))
    newOne = channel.messages.get(packet.id)
    this.client.emit('Message_Update', newOne, if exists then exists else null)

module.exports = MessageUpdate
