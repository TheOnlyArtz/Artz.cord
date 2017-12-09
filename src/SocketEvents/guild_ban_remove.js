const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Guild = require('../Models/Guild.js')
const User = require('../Models/User.js')

/**
* Emits when the client disconnects a guild or the guild becomes unavilable
* @event Client#guildBanRemove
* @param {User} user The user who got unbanned
* @param {Guild} guild The guild
*/
class guildBanRemove extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    const guild = this.client.guilds.get(packet['guild_id']);
    if (guild) {
      const user = client.users.get(packet.id);
      this.client.emit('guildBanRemove', user, guild);
    }
  }
}

module.exports = guildBanAdd
