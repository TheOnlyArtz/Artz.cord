path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
class GuildRoleDelete extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    guild = this.client.guilds.get(packet['guild_id'])
    if guild
      deletedRole = guild.roles.get(packet['role_id'])
      guild.roles.delete(packet.role_id)
      this.client.emit('Guild_Role_Delete', deletedRole)


module.exports = GuildRoleDelete
