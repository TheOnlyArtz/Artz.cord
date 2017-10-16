EventEmitter = (require('events').EventEmitter);
WebSocket = (require('ws'))
SocketHandler = (require './SocketHandler');

class WebSocketManager extends EventEmitter

  constructor: (client) ->
    super;
    Object.defineProperty this, 'client', { value: client }
    this.wsSessionID = null;
    this.HBTimestamp = 0
    this.HBT_ACK = true;

    this.SocketHandler = new SocketHandler(this);


  start: () ->
    that = this
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json');


    that.ws.onclose = (close) ->
      that.emit 'WSclose', close

    that.ws.onmessage = (packet, flags) ->
      that.SocketHandler.handle(packet)

    that.ws.onerror = (e) ->
      that.emit 'WSerror', e

    that.ws.onopen = (open) ->
      that.open = true
      that.emit 'WSopen', open

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
      that.ws.send(JSON.stringify(payload))



  module.exports = WebSocketManager;
