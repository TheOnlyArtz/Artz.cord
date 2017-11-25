const Basic = require('./basic.js');

class HeartBeatACK extends Basic {
  constructor(wshandler) {
    super(wshandler)
  }

  handle(packet) {
    this.wshandler.SocketManager.HBT_ACK = true;
  }

}

module.exports = HeartBeatACK;
