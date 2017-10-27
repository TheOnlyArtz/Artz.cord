EventEmitter = (require('events').EventEmitter);
WebSocketManager = require ('./WebSocket/WebSocketManager')
Box = require('./Models/Box.js');
APIManager = require('./API/APIManager.js')
Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

class Client extends EventEmitter

  constructor: (options = {}) ->
    super;
    this.ws = new WebSocketManager(this);
    this.APIManager = new APIManager(this)

    this.users = new Box;
    this.channels = new Box;
    this.guilds = new Box;
    this.presences = new Box;
    this.emojis = new Box;

    this.readyUnix = null;
    this.uptime = Date.now() - this.readyUnix;

  connect: (token) ->
    that = this
    that.token = "#{token}"
    return new Promise (resolve, reject) ->

      that.ws.on 'WSclose', (e) ->
        that.emit 'close', e

      that.ws.on 'ready', () ->
        if !this.readyUnix
          resolve();

        that.emit 'ready'

      that.ws.on 'WSerror', (e) ->
        if that.readyUnix
          reject(e);

        that.emit 'error', e

      that.ws.start(resolve, reject)

  @property 'uptime',
    get: -> Date.now() - this.readyUnix

  @property 'invite_link',
    get: -> "https://discordapp.com/oauth2/authorize/?permissions=0&scope=bot&client_id=#{this.id}"

  getOption: (name, defaultOpt = null) ->
    if this.options instanceof Object && this.options[name]
      return this.options[name]

    return defaultOpt
module.exports = Client;
