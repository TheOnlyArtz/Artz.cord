const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Guild = require('../Models/Guild.js')

/**
* Emits when the client disconnects a guild or the guild becomes unavilable
* @event Client#guildDelete
* @param {Guild} guild The guild
*/
class GuildDelete extends Basic {
  constructor(client) {
    super(client)
  }
  handle(packet) {
    const guild = this.client.guilds.get(packet.id);
    if (guild) {
      this.client.emit('guildDelete', guild)
    }
  }
}

module.exports = GuildDelete
