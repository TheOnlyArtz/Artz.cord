EventEmitter = (require('events').EventEmitter);
WebSocketManager = (require './WebSocket/WebSocketManager')
class Client extends EventEmitter

  constructor: () ->
    super;
    this.ws = new WebSocketManger(this);

    this.readyUnix = null;
    this.token = null;

  login: (token) ->
    return new Promise (resolve, reject) ->
      this.token = "Bot #{token}"

      this.ws.on 'ready', () ->
        if !this.readyUnix
          resolve();

        this.readyUnix = Date.now;
        this.emit('ready');

      this.ws.on 'WSerror', (e) ->
        if this.readyUnix
          reject(e);

        this.emit 'error', e

      this.ws.start(resolve, reject)
