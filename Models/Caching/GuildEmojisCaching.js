const Box = require('../Box.js');
const Emoji = require('../Emoji.js')
class GuildEmojisCaching {
  constructor(client, guild, data) {
    Object.defineProperty(this, 'client', {value: client});
    this.emojis = new Box();
    data.forEach(emoji => {
      this.emojis.set(emoji.id, new Emoji(client, guild, emoji));
    });
    return this.emojis;
  }
}

module.exports = GuildEmojisCaching;
