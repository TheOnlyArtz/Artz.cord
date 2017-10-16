path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
ClientUser = require(path.join(__dirname, '..', 'Models', 'ClientUser.coffee'));

class ReadyEvent extends Basic

  constructor: (client) ->
    super(client);

  handle: (data) ->
    this.client.user = new ClientUser(this.client, data)
    this.client.ws.wsSessionID = data.session_id;
    this.client.emit('ready')

module.exports = ReadyEvent
