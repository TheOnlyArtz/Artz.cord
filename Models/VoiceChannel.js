class VoiceChannel {
  constructor(client, channel) {
    this.id = channel.id;
    this.type = channel.type;
    this.userLimit = channel.userLimit;
    this.name = channel.name;
    this.position = channel.position;
    this.permissionOverwrites = channel.permissionOverwrites;
    this.bitrate = channel.bitrate;
    this.parentChannelID = channel.parentChannelID
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
