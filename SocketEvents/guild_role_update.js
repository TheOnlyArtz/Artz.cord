const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Role = require(path.join(__dirname, '..', 'Models', 'Role.js'));
class GuildRoleUpdate extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    const guild = this.client.guilds.get(packet['guild_id']);
    const OldRole = guild.roles.get(packet['role']['id'])
    if (guild) {
        guild.roles.set(packet.role.id, new Role(this.client, guild, packet['role']))
        this.client.emit('Guild_Role_Update', guild.roles.get(packet['role']['id']), OldRole)
    }
  }
}

module.exports = GuildRoleUpdate
