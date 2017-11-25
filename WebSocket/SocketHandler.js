const fs = require('fs')
const path = require('path')
class SocketHandler {
  constructor(SocketManager) {
    Object.defineProperty(this, 'SocketManager', { value: SocketManager });

    this.handlers = new Map;
    this.sequence = null;

    this.OPCodes = {
      0: "DISPATCH",
      1: "HEARTBEAT",
      2: "IDENTIFY",
      3: "PRESENCE",
      4: "VOICE_STATE",
      5: "VOICE_PING",
      6: "RESUME",
      7: "RECONNECT",
      8: "REQUEST_MEMBERS",
      9: "INVALIDATE_SESSION",
      10: "HELLO",
      11: "HEARTBEAT_ACK",
      12: "GUILD_SYNC"
    };

    const BasicPath = path.join(__dirname, '..', 'SocketHandlers');
    const files = fs.readdirSync(BasicPath);

    for(const file of files) {
      if (file === 'basic.js') {
        continue
      }

      const name = file
      const handlerPath = require(path.join(BasicPath, name));
      this.handlers.set(name, new handlerPath(this));
    }
  }

  handle(packet) {
    packet = packet.data
    if (packet instanceof Buffer) {
      packet = packet.toString('utf8')
    }

    packet = JSON.parse(packet);
    const name = this.OPCodes[packet.op].toLowerCase();
    if (this.handlers.has(`${name}.js`)) {
      this.handlers.get(`${name}.js`).handle(packet)
    }
  }
}

module.exports = SocketHandler
