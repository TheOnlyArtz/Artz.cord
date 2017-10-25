const Box = require('../Box.js');
const GuildMember = require('../GuildMember.js');
class GuildMembersCaching {
  constructor(client, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.members = new Box();
    data.forEach(member => {
      this.members.set(member.user.id, new GuildMember(client, member));
    });
    return this.members;
  }
}

module.exports = GuildMembersCaching
