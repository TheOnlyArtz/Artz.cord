EventEmitter = (require('events').EventEmitter);
WebSocketManager = (require './WebSocket/WebSocketHandler')
class Client extends EventEmitter

  constructor: () ->
    super;
    this.ws = new WebSocketManger(this);

    this.readyUnix = null;
    this.token = null;
