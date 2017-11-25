const EventEmitter = require('events').EventEmitter
const WebSocketManager = require ('./WebSocket/WebSocketManager')
const Box = require('./Models/Box.js');
const APIManager = require('./API/APIManager.js')

/**
* @param {Object} options Default client options
* @param {String} [options.presence] The default presence
* @param {String} [options.presence.game] The name of the game
* @param {String} [options.presence.url] The URL - Set the client to "Stream"
* @param {String} [options.presence.status] Client's status - 'online', 'dnd' ...
* @property {Object} user The client's user object
* @property {Object} options The client's options
* @property {Box} users A box which includes all the users object the client can get
* @property {Box} channels A box which includes all of the channels the client can access
* @property {Box} guilds A box which includes all of the guilds the client is in
* @property {Box} presences A box which includes all of the presences of the users the client can get
* @property {Box} emojis A box which includes all of the emojis from the guilds the client is in
* @property {Date} uptime Returns the uptime of the client (Unix format)
* @property {String} invite_link Returns Client's invite link (@everyone permissions)
* @property {Number} status Returns Client's connection status to the websocket
*/
class Client extends EventEmitter {
  constructor(options = {}) {
    super();
    this.ws = new WebSocketManager(this);
    this.APIManager = new APIManager(this)

    this.users = new Box;
    this.channels = new Box;
    this.guilds = new Box;
    this.presences = new Box;
    this.emojis = new Box;
    this.options = options
    this.readyUnix = null;
  }

  connect(token) {
    const that = this
    that.token = token
    return new Promise(function(resolve, reject) {
      that.ws.on('WSclose', (e) => {
        that.emit('close', e)
      });

      that.ws.on('ready', () => {
        if (!this.readyUnix) {
          reject(e);
        }

        that.emit('ready')
      });

      that.ws.on('WSerror', (e) => {
        if (that.readyUnix) {
          reject(e);
        }

        that.emit('error', e);
      });

      that.ws.start(resolve, reject);
    });
  }

  get uptime() {
    return Date.now() - this.readyUnix
  }

  get invite_link() {
    return `https://discordapp.com/oauth2/authorize/?permissions=0&scope=bot&client_id=${this.id}`
  }

  get status() {
    return this.ws.connection.status;
  }

  getOption(name, defaultOpt = null) {
    if (this.options instanceof Object && this.options[name]) {
      return this.options[name]
    }
    return defaultOpt;
  }

}

module.exports = Client;
