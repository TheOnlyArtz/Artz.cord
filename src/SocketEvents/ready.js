const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const ClientUser = require(path.join(__dirname, '..', 'Models', 'ClientUser.js'));

/**
* Emits when the client gets connected to the websocket
* @event Client#ready
*/
class ReadyEvent extends Basic {
  constructor(client) {
    super(client);
  }

  handle(data) {
    this.client.user = new ClientUser(this.client, data);
    this.client.ws.wsSessionID = data.session_id;
    this.client.emit('ready');
    this.client.ws.open = true;
    this.client.readyUnix = Date.now();
  }
}

module.exports = ReadyEvent
