path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
Guild = require('../Models/Guild.js')
class Guild_Update extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    guild = this.client.guilds.get(packet.id);
    guild.patchRaw(packet)
    this.client.emit('Guild_Update', guild);

module.exports = Guild_Update
