{ EventEmitter } = (require ('events'))
class EventHandler extends EventEmitter

  constructor: (client) ->
    Object.defineProperty this, 'client', { value: client }

  handle: (pack) ->
    console.log pack
