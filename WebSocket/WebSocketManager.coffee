EventEmitter = (require('events').EventEmitter);

class WebSocketManager extends EventEmitter

  constructor: (client) ->
    super;
    Object.defineProperty this, 'client', { value: client }



  module.exports = WebSocketHandler;
