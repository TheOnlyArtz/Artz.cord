path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));

class MessageCreateEvent extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    channel = this.client.channels.get(packet.id)
    this.client.channels.delete(packet.id)
    this.client.emit('Channel_Delete', channel);

module.exports = MessageCreateEvent
