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

    this.user = new User(client, member.user)
    this.deaf = member.deaf;

    this.roles = new Box;
    for (let role of member.roles) {
      this.roles.set(role, guild.roles.get(role))
    }

  }

  toString() {
    return `<@${this.member.user.id}>`
  }

  ban() {
    return new Promise(async (resolve, reject) => {

    });
  }

  kick() {
    return new Promise(async (resolve, reject) => {

    });
  }

  changeNickname(nickname) {
    return new Promise(async (resolve, reject) => {
      if (!nickname) {
        reject('ERROR: Please supply a username');
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
        reject(e)
      }

    });
  }

  assignRole() {
    return new Promise(async (resolve, reject) => {

    });
  }

  removeRole() {
    return new Promise(async (resolve, reject) => {

    });
  }


}

module.exports = GuildMember;
