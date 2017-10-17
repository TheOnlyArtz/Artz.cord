path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
Guild = require(path.join(__dirname, '..', 'Models', 'Guild.js'));

class GuildCreateEvent extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    guild = new Guild(this.client, packet);
    this.client.guilds.set(guild.id, guild);
    this.client.emit('Guild_Create', guild);

module.exports = GuildCreateEvent
