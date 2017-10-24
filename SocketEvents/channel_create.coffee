path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));

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

module.exports = ChannelCreate
