const Box = require('../Box.js');

class GuildRolesCaching {
  constructor(client, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.roles = new Box();
    data.forEach(role => {
      this.roles.set(role.id, role);
    });
    return this.roles;
  }
}

module.exports = GuildRolesCaching
