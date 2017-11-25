const Basic = require('./basic.js')

class HelloHandler extends Basic {
  constructor(wshandler) {
    super(wshandler)
      this.heartbeat = null
  }

  handle(packet) {
    this.heartbeat = setInterval(() => {
        this.wshandler.SocketManager.HBTimestamp = Date.now();
        this.wshandler.SocketManager.HBT_ACK = false;

        if (this.wshandler.SocketManager.open) {
          this.wshandler.SocketManager.ws.send(JSON.stringify({ op: 1, d: this.wshandler.sequence, s: null, t: null }))
        }
      }, packet.d.heartbeat_interval)
  }

  close() {
    if (heartbeat) {
      clearInterval(this.heartbeat)
    }
  }
}

module.exports = HelloHandler;
