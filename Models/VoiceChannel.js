class VoiceChannel {
  constructor(client, data) {
    this.id = data.id;
    this.type = data.type;
    this.userLimit = data.userLimit;
    this.name = data.name;
    this.position = data.position;
    this.permissionOverwrites = data.permissionOverwrites;
    this.bitrate = data.bitrate;
    this.parentChannelID = data.parentChannelID
  }
}

module.exports = VoiceChannel;
