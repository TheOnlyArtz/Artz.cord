const User = require('../User.js');
const Box = require('../Box.js');
class MessageMentionCaching {
  constructor(client, message, users, roleMentions, everyone) {
    if (users) {
      if (users instanceof Box) {
        this.users = new Box(users)
      } else {
        this.users = new Box();

        for (let user of users) {
          this.users.set(user.id, message.guild.members.get(user.id));
        }
      }
    }

    if (roleMentions) {
      if (roleMentions instanceof Box) {
        this.roles = new Box(roleMentions)
      } else {
        this.roles = new Box();

        for (let role of roleMentions) {
          this.roles.set(role, message.guild.roles.get(role));
        }
      }
    }
  }
}
// TODO: keep going!
module.exports = MessageMentionCaching;
