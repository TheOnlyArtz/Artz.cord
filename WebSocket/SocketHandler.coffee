# Made by Charlotte Ddounis AKA Neko
# https://github.com/CharlotteDunois/NekoDAPI/blob/master/wshandler.js
# With her permission

class SocketHandler

  constructor: (SocketManager) ->
    Object.defineProperty(this, 'SocketHandler', { value: SocketHandler });

    this.handlers = new Map;
    this.sequence = null;
    
    this.OPCodes = {
      DISPATCH: 0,
      HEARTBEAT: 1,
      IDENTIFY: 2,
      PRESENCE: 3,
      VOICE_STATE: 4,
      VOICE_PING: 5,
      RESUME: 6,
      RECONNECT: 7,
      REQUEST_MEMBERS: 8,
      INVALIDATE_SESSION: 9,
      HELLO: 10,
      HEARTBEAT_ACK: 11,
      GUILD_SYNC: 12
    };

    BasicPath = '../SocketHandlers'
    files = fs.readdirSync(BasicPath)

    for file of files
      if file == 'basic.coffee'
        continue

      name = file.substr 0, (file.length - 3)
      handlerPath = BasicPath + file

      this.handlers.set name, new handlerPath(this);

  handle: (packet) ->
    if packet intanceof Buffer
      packet = packet.toString('utf8')

    packet = JSON.parse(packet);

    if packet.s
      this.sequence = packet.s

    name = OPCodes[packet.s].toLowerCase();
    if this.handlers.has name
      this.handlers.get(name).handle(packet)
module.exports = SocketHandler
