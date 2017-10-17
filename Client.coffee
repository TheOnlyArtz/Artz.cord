EventEmitter = (require('events').EventEmitter);
WebSocketManager = (require './WebSocket/WebSocketManager');

class Client extends EventEmitter

  constructor: () ->
    super;
    this.ws = new WebSocketManager(this);



    this.users = new Map
    this.channels = new Map;
    this.guilds = new Map;

    this.readyUnix = null;
    this.uptime = Date.now() - this.readyUnix;
  login: (token) ->
    that = this
    that.token = "#{token}"
    return new Promise (resolve, reject) ->

      that.ws.on 'ready', () ->
        if !this.readyUnix
          resolve();

        that.emit 'ready'

      that.ws.on 'WSerror', (e) ->
        if that.readyUnix
          reject(e);

        that.emit 'error', e

      that.ws.start(resolve, reject)


module.exports = Client;
