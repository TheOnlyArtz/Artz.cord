const Box = require('../Box.js');
const Role = require('../Role.js');
class GuildRolesCaching {
  constructor(client, guild, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.roles = new Box();
    data.forEach(role => {
      this.roles.set(role.id, new Role(client, guild, role));
    });
    return this.roles;
  }
}

module.exports = GuildRolesCaching
