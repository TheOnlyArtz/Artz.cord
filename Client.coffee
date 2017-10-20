EventEmitter = (require('events').EventEmitter);
WebSocketManager = (require './WebSocket/WebSocketManager');
RequestHandler = (require './API/RequestHandler.js')
Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

class Client extends EventEmitter

  constructor: () ->
    super;
    this.ws = new WebSocketManager(this);



    this.users = new Map
    this.channels = new Map;
    this.guilds = new Map;
    this.readyUnix = null;

    this.ApiRequest = new RequestHandler;

    this.uptime = Date.now() - this.readyUnix;
  login: (token) ->
    that = this
    that.token = "#{token}"
    return new Promise (resolve, reject) ->

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

module.exports = Client;
