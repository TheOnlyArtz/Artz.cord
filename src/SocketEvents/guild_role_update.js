const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Role = require(path.join(__dirname, '..', 'Models', 'Role.js'));

/**
* Emits when a role gets updated
* @event Client#guildRoleUpdate
* @param {Role} newRole The updated role
* @param {Role} oldRole The old role
*/
class GuildRoleUpdate extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    const guild = this.client.guilds.get(packet['guild_id']);
    const OldRole = guild.roles.get(packet['role']['id'])
    if (guild) {
        guild.roles.set(packet.role.id, new Role(this.client, guild, packet['role']))
        this.client.emit('guildRoleUpdate', guild.roles.get(packet['role']['id']), OldRole)
    }
  }
}

module.exports = GuildRoleUpdate
