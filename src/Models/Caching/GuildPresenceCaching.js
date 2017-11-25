const Box = require('../Box.js');
const Presence = require('../Presence.js');
class GuildPresenceCaching {
  constructor(client, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.presences = new Box();
    data.forEach(presence => {
      this.presences.set(presence.user.id, new Presence(client, presence));
    });
    return this.presences;
  }
}

module.exports = GuildPresenceCaching
