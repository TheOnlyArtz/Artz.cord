const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Guild = require('../Models/Guild.js')

/**
* Emits when the client joins a new guild
* @event Client#guildUpdate
* @param {Guild} guild The new guild
*/
class Guild_Update extends Basic {
  constructor(client) {
    super(client)
  }
  handle(packet) {
    let old = this.client.guilds.get(packet.id)
    let oldGuild = Object.assign(Object.create(old), old);
    let newGuild = this.client.guilds.get(packet.id).patchRaw(packet)
    this.client.emit('guildUpdate', newGuild, oldGuild)
  }
}

module.exports = Guild_Update
