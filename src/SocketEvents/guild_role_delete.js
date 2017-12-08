const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
/**
* Emits when a role gets deleted
* @event Client#guildRoleDelete
* @param {Role} role The deleted role
*/
class GuildRoleDelete extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    let guild = this.client.guilds.get(packet['guild_id']);
    if (guild) {
      const deletedRole = guild.roles.get(packet['role_id']);
      guild.roles.delete(packet.role_id)
      this.client.emit('guildRoleDelete', deletedRole)
    }
  }
}

module.exports = GuildRoleDelete
