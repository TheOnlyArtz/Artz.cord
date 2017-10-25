const User = require('./user.js');
class GuildMember {
  constructor(client, member) {
    this.user = client.users.get(member.user.id)
    this.roles = member.roles;
    this.muted = member.mute;
    this.joinedAt = member.joined_at;
    this.deaf = member.deaf;
  }

  ban() {
    return new Promise(async (resolve, reject) => {

    });
  }

  kick() {
    return new Promise(async (resolve, reject) => {

    });
  }

  changeNickname() {
    return new Promise(async (resolve, reject) => {

    });
  }

  putRole() {
    return new Promise(async (resolve, reject) => {

    });
  }

  removeRole() {
    return new Promise(async (resolve, reject) => {

    });
  }


}

module.exports = GuildMember;
