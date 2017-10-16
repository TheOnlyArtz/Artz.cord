EventEmitter = (require('events').EventEmitter);
WebSocket = (require('ws'))
SocketHandler = (require './SocketHandler');

class WebSocketManager extends EventEmitter

  constructor: (client) ->
    super;
    Object.defineProperty this, 'client', { value: client }
    this.ws.sessionID = null;
    this.HBTimestamp = 0
    this.HBT_ACK = true;
    this.SocketHandler = new SocketHandler(this);

  send: (pack) ->
    this.ws.send(JSON.stringify(pack))

  start: () ->
    that = this
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json');

    that.ws.onmessage = (packet, flags) ->
      that.emit 'WSmessage', packet, flags

    that.ws.onclose = (close) ->
      that.emit 'WSclose', close

    that.ws.onerror = (e) ->
      that.emit 'WSerror', e

    that.ws.onopen = (open) ->
      that.emit 'WSopen', open
      if this.ws.sessionID == null

        payload = {"op" : 2, "d": {
          "token": that.client.token.toString(),
          "properties": {
            '$os' : require('os').platform(),
            '$browser' : 'ArtzyCord',
            '$device'  : 'One Plus 5',
            "$referrer":"",
            "$referring_domain":""

          },

          'compress': false,
          'large_threshold' : 250,
          "shard": [0, 1],
          } }
          that.send(JSON.stringify(payload))




  module.exports = WebSocketManager;
