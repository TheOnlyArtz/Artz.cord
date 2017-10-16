EventEmitter = (require('events').EventEmitter);
WebSocket = (require('ws'))

class WebSocketManager extends EventEmitter

  constructor: (client) ->
    super;
    Object.defineProperty this, 'client', { value: client }

  send: (pack) ->
    this.ws.send(JSON.stringify(pack))

  start: () ->
    that = this
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json');

    this.ws.onmessage = (packet) ->
      this.emit 'WSmessage', packet

    this.ws.onclose = (close) ->
      this.emit 'WSclose', close

    this.ws.onerror = (e) ->
      this.emit 'WSerror', e

    this.ws.onopen = (open) ->
      this.emit 'WSopen', open

      payload = {"op" : 2, "d": {
        "token": that.client.token.toString(),
        "properties": {
          '$os' : require('os').platform(),
          '$browser' : 'ArtzyCord',
          '$device'  : 'One Plus 5',
        },
        "compress": false
        } }
      this.send(JSON.stringify(payload))

  module.exports = WebSocketManager;
