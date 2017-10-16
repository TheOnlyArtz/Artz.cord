Basic = require './basic.coffee'

class HelloHandler extends Basic

  constructor: (wshandler) ->
    super(wshandler)
    this.heartbeat = null;
    # wshandler.wsmanager.on 'WSclose', () ->
      # this.close()
  handle: (packet) ->
    that = this
    this.heartbeat = setInterval ->
      that.wshandler.SocketManager.HBTimestamp = Date.now();
      that.wshandler.SocketManager.HBT_ACK = false;

      if that.wshandler.SocketManager.open
        that.wshandler.SocketManager.ws.send(JSON.stringify({ op: 1, d: that.wshandler.sequence, s: null, t: null }));
     , packet.d.heartbeat_interval

  close: () ->
    if heartbeat
      clearInterval this.heartbeat
module.exports = HelloHandler;
