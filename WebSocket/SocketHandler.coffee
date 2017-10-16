# Made by Charlotte Ddounis AKA Neko
# https://github.com/CharlotteDunois/NekoDAPI/blob/master/wshandler.js
# With her permission
fs = require('fs')
path = require('path')
class SocketHandler

  constructor: (SocketManager) ->
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

    BasicPath = path.join(__dirname, '..', 'SocketHandlers');
    files = fs.readdirSync(BasicPath)

    for file in files
      if file == 'basic.coffee'
        continue

      name = file
      handlerPath = require(path.join(BasicPath, file));
      this.handlers.set name, new handlerPath(this);

  handle: (packet) ->
    packet = packet.data
    if packet instanceof Buffer
      packet = packet.toString('utf8')

    packet = JSON.parse(packet);

    name = this.OPCodes[packet.op].toLowerCase();
    if this.handlers.has name + '.coffee'
      this.handlers.get(name + '.coffee').handle(packet)
module.exports = SocketHandler
