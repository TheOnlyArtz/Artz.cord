const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Guild = require('../Models/Guild.js')

/**
* Emits when the client disconnects a guild or the guild becomes unavilable
* @event Client#guildBanAdd
* @param {GuildMember} member The member who got baned
* @param {Guild} guild The guild
*/
class guildBanAdd extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    const guild = this.client.guilds.get(packet['guild_id']);
    if (guild) {
      const member = guild.members.get(packet.user.id);
      this.client.emit('guildBanAdd', member, guild)
    }
  }
}

module.exports = guildBanAdd
