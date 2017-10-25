class GuildRolesCaching {
  constructor(client, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.roles = new Map();
    data.forEach(role => {
      this.roles.set(role.id, role);
    });
    return this.roles;
  }
}

module.exports = GuildRolesCaching
