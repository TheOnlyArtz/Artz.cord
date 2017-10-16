class BasicHandler

  constructor: (client) ->
    Object.defineProperty(this, 'client', { value: client });


module.exports = BasicHandler
