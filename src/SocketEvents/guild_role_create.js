const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Role = require(path.join(__dirname, '..', 'Models', 'Role.js'));

/**
* Emits when a role gets created
* @event Client#guildRoleCreate
* @param {Role} role The created Role
*/
class GuildRoleCreate extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    let guild = this.client.guilds.get(packet['guild_id']);

    if (guild) {
        guild.roles.set(packet.role.id, new Role(this.client, guild, packet['role']))
        this.client.emit('guildRoleCreate', guild.roles.get(packet['role']['id']))
    }
  }
}

module.exports = GuildRoleCreate
