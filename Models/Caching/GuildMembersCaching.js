const Box = require('../Box.js');
const GuildMember = require('../GuildMember.js');
class GuildMembersCaching {
  constructor(client, guild, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.members = new Box();
    data.forEach(member => {
      this.members.set(member.user.id, new GuildMember(client, guild, member));
    });
    return this.members;
  }
}

module.exports = GuildMembersCaching
