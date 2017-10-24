path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
ChannelCaching = require(path.join(__dirname, '..', 'Models', 'ChannelCaching.js'));
class ChannelCreate extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    that = this
    this.client.emit('Channel_Create', packet);
    ####################################################
    #                                                  #
    #  A caching process being done to prevent spam    #
    #                                                  #
    ####################################################
    this.ChannelCaching = new ChannelCaching(this.client, packet).filterThroughTypes(packet);
module.exports = ChannelCreate
