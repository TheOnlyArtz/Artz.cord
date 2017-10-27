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
          this.users.set(user.id, new User(client, user))
        }
      }
    }
  }
}
// TODO: keep going!
module.exports = MessageMentionCaching;
