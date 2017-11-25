const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const GuildMember = require(path.join(__dirname, '..', 'Models', 'GuildMember.js'));
class GuildMemberAdd extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    let guild = this.client.guilds.get(packet['guild_id']);
    if (guild) {
      guild.members.set(packet.user.id, new GuildMember(this.client, guild, packet))
      this.client.emit('Guild_newMember', guild.members.get(packet['user']['id']))      
    }
  }
}

module.exports = GuildMemberAdd
