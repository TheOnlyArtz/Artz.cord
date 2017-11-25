const Basic = require('./basic.js')

class Dispatch extends Basic {
  constructor (wshandler) {
    super(wshandler)
    this.events = new Map;
    const BasicPath = require('path').join(__dirname, '..', 'SocketEvents');
    const files = require('fs').readdirSync(BasicPath)

    for (const file of files) {
      if (file === 'basic.js') {
        continue
      }
      let name = file.substr(0, (file.length));
      let event = require(`${BasicPath}/${file}`)
      this.events.set(name, new event(this.wshandler.SocketManager.client))
    }
  }

  handle(packet) {
    if (this.events.has(packet.t.toLowerCase() + '.js')) {
      this.events.get(packet.t.toLowerCase() + '.js').handle(packet.d)
    }
  }
}

module.exports = Dispatch;
