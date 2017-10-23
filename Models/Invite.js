const User = require('./User.js');
const Guild = require('./Guild.js');
const GuildChannel = require('./GuildChannel.js');

class Invite {
  constructor(client, data) {
    // FIXME: GuildChannel is not a constructor.
    Object.defineProperty(this, 'client', {value: client});
    this.inviter = new User(client, data.inviter);
    this.channel = new GuildChannel(client, client.channels.get(data.channel.id));
    this.guild = new Guild(client, client.guilds.get(data.guild.id));
    this.inviteCode = data.code;
    this.createdTimestamp = data.created_at;
    this.uses = data.uses;
    this.maxUses = data.max_uses;
  }

  get inviteLink() {
    return `https://discord.gg/${this.inviteCode}`
  }
}

module.exports = Invite;
