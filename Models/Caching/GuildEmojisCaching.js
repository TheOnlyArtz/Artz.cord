const Box = require('../Box.js');
// TODO: Emoji structure
const Emoji = require('../Emoji.js')
class GuildEmojisCaching {
  constructor(client, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.emojis = new Box();
    data.forEach(emoji => {
      this.emojis.set(emoji.id, new Emoji(client, emoji));
    });
    return this.emojis;
  }
}

module.exports = GuildEmojisCaching;
