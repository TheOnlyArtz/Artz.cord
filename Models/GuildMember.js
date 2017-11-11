const User = require('./user.js');
const Structure = require('./Structure.js');
const Box = require('./Box.js')
class GuildMember extends Structure {
  constructor(client, guild, member) {
    super(client);
    Object.defineProperty(this, 'guild', {value: guild});
    Object.defineProperty(this, 'member', {value: member});
    this.muted = member.mute;
    this.joinedAt = member.joined_at;

    this.user = this.client.users.get(member.user.id) ? this.client.users.get(member.user.id) : new User(client, member.user)
    this.deaf = member.deaf;

    this.roles = new Box;
    for (let role of member.roles) {
      this.roles.set(role, guild.roles.get(role))
    }

  }

  toString() {
    return `<@${this.member.user.id}>`
  }
  // TODO: Return message requests.
  async ban(options) {
    const payload = {
      reason : options ? options.reason || null : null
    }

    const guildID = this.guild.id;
    const endpoint = this.client.APIManager.endpoints
      .ENDPOINTS_GUILDS
      .bans
      .create(guildID, this.user.id);

    try {
      let res = await this.client.APIManager.makeRequest('delete', endpoint, payload);
    } catch (e) {
      throw e;
    }
  }

  async kick(options) {

    const payload = {
      reason : options ? options.reason || null : null
    }

    const guildID = this.guild.id;

    const endpoint = this.client.APIManager.endpoints
      .ENDPOINTS_GUILDS
      .members
      .remove(guildID, this.user.id);
      try {
        let res = await this.client.APIManager.makeRequest('delete', endpoint, payload);
      } catch (e) {
        throw new Error(e);
      }

  }

  async changeNickname(nickname) {
      if (!nickname) {
        throw new Error('ERROR: Please supply a nickname');
      }

      let guildID = this.guild.id;

      const payload = {
        nick: nickname,
      };

      const endpoint = this.client.APIManager.endpoints
        .ENDPOINTS_GUILDS
        .members
        .modify(guildID, this.user.id);

      try {
        let res = await this.client.APIManager.makeRequest('patch', endpoint, payload);
      } catch (e) {
        throw new Error(e)
      }

  }

  async assignRole() {

  }

  async removeRole() {
  }


}

module.exports = GuildMember;
