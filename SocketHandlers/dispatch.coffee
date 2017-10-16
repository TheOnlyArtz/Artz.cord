Basic = require './basic.coffee'

class Dispatch extends Basic

  constructor: (wshandler) ->
    super(wshandler)
    this.events = new Map;
    that = this
    BasicPath = require('path').join(__dirname, '..', 'SocketEvents')
    files = require('fs').readdirSync(BasicPath)

    for file in files
      if file == 'basic.js'
        continue

      name = file.substr(0, (file.length))
      event = require BasicPath + '/'+ file
      that.events.set name, new event(that.wshandler.SocketManager.client)

  handle: (packet) ->
    that = this
    if that.events.has packet.t.toLowerCase() + '.coffee'
      that.events.get(packet.t.toLowerCase() + '.coffee').handle(packet.d)

module.exports = Dispatch;
