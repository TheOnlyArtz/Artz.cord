EventEmitter = (require('events').EventEmitter);
WebSocket = (require('ws'))

class WebSocketManager extends EventEmitter

  constructor: (client) ->
    super;
    Object.defineProperty this, 'client', { value: client }


  start: () ->
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json');

    this.ws.onmessage = (packet) ->
      this.emit 'WSmessage', packet

    this.ws.onopen = (open) ->
      this.emit 'WSopen', open

    this.ws.onerror = (e) ->
      this.emit 'WSerror', e

      this.send({op : 2, d: {
        token: this.client.token,
        properties: {
          '$os' : require('os').platform(),
          '$browser' : 'ArtzyCord',
          '$device'  : 'One Plus 5',
        },
        compress: false
        } })

  module.exports = WebSocketHandler;
