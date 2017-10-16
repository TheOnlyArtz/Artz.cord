Basic = require './basic.coffee'

class HelloHandler extends Basic

  constructor: (wshandler) ->
    super(wshandler)
    this.heartbeat = null;
    # wshandler.wsmanager.on 'WSclose', () ->
      # this.close()
  handle: (packet) ->
    this.heartbeat = setInterval ->
      this.wshandler.wsmanager.ws_heartbeat_timestamp = Date.now();
      this.wshandler.wsmanager.ws_heartbeat_ack = false;

      this.wshandler.wsmanager.send({ op: 1, d: this.wshandler.sequence });
     d.heartbeat_interval

  close: () ->
    if heartbeat
      clearInterval this.heartbeat
module.exports = HelloHandler;
