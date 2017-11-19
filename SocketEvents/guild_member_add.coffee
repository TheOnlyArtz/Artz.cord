path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
GuildMember = require(path.join(__dirname, '..', 'Models', 'GuildMember.js'));
class GuildMemberAdd extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    guild = this.client.guilds.get(packet['guild_id']);
    if guild
      guild.members.set(packet.user.id, new GuildMember(this.client, guild, packet))
      this.client.emit('Guild_newMember', guild.members.get(packet['user']['id']))


module.exports = GuildMemberAdd
