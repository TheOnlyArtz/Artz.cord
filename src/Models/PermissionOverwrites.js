const Permissions = require('./Permissions.js');
/**
* A class which controls over PermissionOverwrites properties
* @param {Client} client ArtzyCord's client instance
* @param {GuildTextChannel|CategoryChannel} channel
* @param {Object} data PermissionOverwrites array
* @property {String} type permissionOverwrite's scope (role or member)
* @property {String} id PermissionOverwrites's scoped object ID (role ID or member ID)
* @property {Permissions} deny The permissions list which the overwrite deny members / roles to do
* @property {Permissions} allow The permissions list which the overwrite allows members / roles to do
*/
class PermissionOverwrites {
  constructor(client, channel, data) {
    this.channel = channel;
    this.type = data.type;
    this.id = data.id;
    this.deny = new Permissions(client, data.deny);
    this.allow = new Permissions(client, data.allow);
    Object.defineProperty(this, 'client', {value: client})
  }

  /**
  * Get the guild the overwrite happend in
  * @returns {Guild}
  */
  get guild() {
    return this.client.guilds.get(this.channel.guildID)
  }
}

module.exports = PermissionOverwrites;
