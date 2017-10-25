class VoiceChannel {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.userLimit = data.user_limit;
    this.name = data.name;
    this.position = data.position;
    this.permissionOverwrites = data.permission_overwrites;
    this.bitrate = data.bitrate;
    this.parentChannelID = data.parent_id
  }
}

module.exports = VoiceChannel;
