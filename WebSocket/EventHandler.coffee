{ EventEmitter } = (require ('events'))
class EventHandler extends EventEmitter

  constructor: (client) ->
    super;
    Object.defineProperty this, 'client', { value: client }

  handle: (pack, flags) ->
    console.log JSON.parse(pack)

module.exports = EventHandler
