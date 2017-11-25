const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const ChannelCaching = require('../Models/Caching/ChannelCaching.js')

/**
* Emits when a channel gets updated
* @event Client#Channel_Update
* @param {GuildTextChannel|VoiceChannel|GroupDM|DMChannel} newChannel The updated channel
* @param {GuildTextChannel|VoiceChannel|GroupDM|DMChannel} oldChannel The old channel
*/
class Channel_Update extends Basic {
  constructor(client) {
    super(client)
  }
  handle(packet) {
    const guild = this.client.guilds.get(packet.guild_id)
    const oldChannel = guild.channels.get(packet.id)
    if (guild) {
      guild.channels.set(packet.id, new ChannelCaching(this.client).filterThroughTypesRAWDATA(packet))
      let newChannel = guild.channels.get(packet.id)
      this.client.emit('Channel_Update', newChannel, oldChannel);
    }
  }
}
module.exports = Channel_Update
