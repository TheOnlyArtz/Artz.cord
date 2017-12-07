const Structure = require('./Structure.js');

/**
* A CategoryChannel Structure meant to control CategoryChannel properties and methods
* @param {Client} client ArtzyCord's Client instance
* @param {Object} channel A valid Channel data Object
* @property {Number} type Channel's type
* @property {String} name Channel's name
* @property {String} id Channel's ID
* @property {Number} userLimit Channel's user limit
* @property {Array|Object} permissionOverwrites Channel's permission overwrites
* @property {Number} position Channel's position
* @property {Number} bitrate Channel's bitrate
*/
class CategoryChannel extends Structure {
  constructor(client, channel) {
    super(client);
    this.type = channel.type;
    this.name = channel.name;
    this.id = channel.id;
    this.userLimit = channel.user_limit;
    this.permissionOverwrites = channel.permission_overwrites;
    this.position = channel.position;
    this.bitrate = channel.bitrate
  }
}

module.exports = CategoryChannel
