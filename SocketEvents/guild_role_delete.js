const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
class GuildRoleDelete extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    let guild = this.client.guild.get(packet['guild_id']);
    if (guild) {
      const deletedRole = guild.roles.get(packet['role_id']);
      guild.roles.delete(packet.role_id)
      this.client.emit('Guild_Role_Delete', deletedRole)
    }
  }
}

module.exports = GuildRoleDelete
