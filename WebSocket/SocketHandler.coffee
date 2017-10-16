class SocketHandler

  constructor: (SocketManager) ->
    Object.defineProperty(this, 'SocketHandler', { value: SocketHandler });

    this.handlers = new Map;

    BasicPath = '../SocketHandlers'
    files = fs.readdirSync(BasicPath)

    for file of files
      if file == 'basic.coffee'
        continue

      name = file.substr 0, (file.length - 3)
      handlerPath = BasicPath + file

      this.handlers.set name, new handlerPath(this);


module.exports = SocketHandler 
