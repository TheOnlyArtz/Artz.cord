path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
GuildChannel = require('../Models/Guild.js')
class Channel_Update extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    channel = this.client.channels.get(packet.id);
    channel.patchRaw(packet);
    this.client.emit('Channel_Update', channel)

module.exports = Channel_Update
