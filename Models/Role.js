class Role {
  constructor(client, guild, role) {
    this.mentionable = role.mentionable;
    this.position = role.position;
    this.name = role.name;
    this.managed = role.managed;
    this.color = role.color;
    this.permissions = role.permissions;
    this.id = role.id;
    this.hoist = role.hoist;
  }

  // TODO: Write the functions
  
  delete() {

  }

  changeName() {

  }

  changePosition() {

  }

}

module.exports = Role
