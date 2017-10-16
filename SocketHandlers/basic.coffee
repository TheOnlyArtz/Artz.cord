class BasicHandler

  constructor: (wshandler) ->
    Object.defineProperty(this, 'wshandler', { value: wshandler });

module.exports = BasicHandler
