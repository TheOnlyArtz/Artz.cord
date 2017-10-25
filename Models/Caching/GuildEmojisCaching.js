const Box = require('../Box.js');

class GuildEmojisCaching {
  constructor(client, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.emojis = new Box();
    data.forEach(emoji => {
      this.emojis.set(emoji.id, emoji);
    });
    return this.emojis;
  }
}

module.exports = GuildMembersCaching;
