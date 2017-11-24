const Structure = require('./Structure.js');

/**
* A CategoryChannel Structure meant to control CategoryChannel properties and methods
* @param {Object} client ArtzyCord's Client instance
* @param {Object} channel A valid Channel data Object
* @property {Number} type Channel's type
* @property {String} name Channel's name
* @property {String} id Channel's ID
* @property {Array|Object} permissionOverwrites Channel's permission overwrites
* @property {Boolean} nsfw Whether the Channel is nsfw or not
* @property {Number} position Channel's position
* @property {String} parentChannelID Parent channel ID
* @property {String} guildID Guild's ID (The channel is in)
*/
class CategoryChannel extends Structure {
  constructor(client, channel) {
    this.type = channel.type;
    this.name = channel.name;
    this.id = channel.id;
    this.permissionOverwrites = channel.permissionOverwrites || channel.permission_overwrites;
    this.nsfw = channel.nsfw;
    this.position = channel.position;
    this.parentChannelID = channel.parentID || channel.parent_id
    this.guildID = channel.guildID || channel.guild_id;
  }
}
