class Message {
  constructor(client, data) {
    this.tts = data.tts;
    this.createdTimestamp = data.timestamp;
    this.pinned = data.pinned;
    this.nonce = data.nonce;
    this.id = data.id;
    this.channelID = data.channelID; // TODO: Make it new TextChannel
    this.author = data.author;
    this.mentions = new Map(data.mentions);
    this.roleMentions = new Map(data.mention_roles);
    this.attachments = new Map(data.attachments)
    this.embeds = new Map(data.embeds);
  }
}

module.exports = Message
