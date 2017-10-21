path = require('path')
Basic = require(path.join(__dirname, 'basic.coffee'));
Guild = require(path.join(__dirname, '..', 'Models', 'Guild.js'));
ChannelCaching = require(path.join(__dirname, '..', 'Models', 'ChannelCaching.js'));
PresenceCaching = require(path.join(__dirname, '..', 'Models', 'PresenceCaching.js'));
UserCaching = require(path.join(__dirname, '..', 'Models', 'UserCaching.js'));

class GuildCreateEvent extends Basic

  constructor: (client) ->
    super(client);

  handle: (packet) ->
    that = this
    guild = new Guild(this.client, packet);
    this.client.guilds.set(guild.id, guild);
    this.client.emit('Guild_Create', guild);

    ####################################################
    #                                                  #
    #  A caching process being done to prevent spam    #
    #                                                  #
    ####################################################
    this.ChannelCaching = new ChannelCaching(this.client, this.client.guilds)._cache();
    this.PresenceCaching = new PresenceCaching(this.client, guild.presence)._cache();
    this.UserCaching = new UserCaching(this.client, guild.members)._cache();

module.exports = GuildCreateEvent
