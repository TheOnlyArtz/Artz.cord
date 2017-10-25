const Box = require('../Box.js');

class GuildMembersCaching {
  constructor(client, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.members = new Box();
    data.forEach(member => {
      this.members.set(member.id, role);
    });
    return this.members;
  }
}

module.exports = GuildMembersCaching
