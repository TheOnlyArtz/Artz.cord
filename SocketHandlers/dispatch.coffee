Basic = require './basic.coffee'

class Dispatch extends Basic

  constructor: (wshandler) ->
    super(wshandler)

    this.events = new Map;

    BasicPath = require('path').join(__dirname, '..', 'SocketEvents')
    files = require('fs').readdirSync(BasicPath)

    for file of files
      if file == 'basic.js'
        continue

      name = file.substr(0, (file.length - 3))
      event = require BasicPath + file

      this.events.set name, new Event(this.wshandler.wsmanager.client)

  handle: (packet) ->
    if this.events.has packet.t.toLowerCase()
      this.events.get packet.t.toLowerCase().handle(packet.d)

module.exports = Dispatch;
