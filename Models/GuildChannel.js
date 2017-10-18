const TextChannel = require('./TextChannel.js')
class GuildChannel {
  constructor(client, data) {
    switch (data.type) {
      case 0:
          return new TextChannel(client, data)
        break;
      case 1:
          throw new Error('DM cannot be a guild channel.');
        break;
      case 2:
          return; // TODO: VoiceChannel structure
        break;
      case 3:
          throw new Error('Group DM cannot be a guild channel')
        break;
      case 4:
          return;

    }
  }
}

module.exports = GuildChannel
