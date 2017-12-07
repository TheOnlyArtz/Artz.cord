/**
* An VoiceChannel Structure meant to control over VoiceChannel properties and methods
* @extends Structure
* @param {Client} client ArtzyCord's Client instance
* @param {Object} channel A valid VoiceChannel data Object
*/
class VoiceChannel {
  constructor(client, channel) {
    this.id = channel.id;
    this.type = channel.type;
    this.userLimit = channel.userLimit || channel.user_limit;
    this.name = channel.name;
    this.position = channel.position;
    this.permissionOverwrites = channel.permissionOverwrites || channel.permission_overwrites;
    this.bitrate = channel.bitrate;
    this.parentChannelID = channel.parentChannelID || channel.parent_id
  }

  patchRaw(channel) {
    this.id = channel.id;
    this.type = channel.type;
    this.userLimit = channel.user_limit ? channel.user_limit : this.userLimit || 2;
    this.name = channel.name;
    this.position = channel.position;
    this.permissionOverwrites = channel.permission_overwrites; // TODO: permissionOverwrites cacher
    this.bitrate = channel.bitrate;
    this.parentChannelID = channel.parent_id ? channel.parent_id : this.parentChannelID;
  }
}

module.exports = VoiceChannel;
