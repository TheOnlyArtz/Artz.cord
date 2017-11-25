const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Guild = require(path.join(__dirname, '..', 'Models', 'Guild.js'));
const ChannelCaching = require(path.join(__dirname, '..', 'Models', 'Caching', 'ChannelCaching.js'));
const PresenceCaching = require(path.join(__dirname, '..', 'Models', 'Caching', 'PresenceCaching.js'));
const UserCaching = require(path.join(__dirname, '..', 'Models', 'Caching', 'UserCaching.js'));
const EmojisCaching = require(path.join(__dirname, '..', 'Models', 'Caching', 'EmojisCaching.js'));

class GuildCreateEvent extends Basic {
  constructor(client) {
    super(client)
  }

  handle(packet) {
    let guild = new Guild(this.client, packet);
    this.client.guilds.set(guild.id, guild);
    this.client.emit('Guild_Create', guild);

    this.ChannelCaching = new ChannelCaching(this.client, this.client.guilds)._cache();
    this.PresenceCaching = new PresenceCaching(this.client, guild.presences.array())._cache();
    this.UserCaching = new UserCaching(this.client, guild.members.array())._cache();
    this.EmojisCaching = new EmojisCaching(this.client, guild.emojis.array())._cache();
  }
}

module.exports = GuildCreateEvent
