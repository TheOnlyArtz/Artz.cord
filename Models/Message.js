module.exports = class Message {
  constructor(client, data) {
    this.tts = data.tts || null;
    this.createdTimestamp = data.timestamp || null;
    this.pinned = data.pinned || null;
    this.nonce = data.nonce || null;
    this.content = data.content;
    this.id = data.id || null;
    this.channelID = data.channel_id || null // TODO: Make it new TextChannel
    this.author = data.author || null
    this.mentions = new Map(data.mentions);
    this.roleMentions = new Map(data.mention_roles);
    this.attachments = new Map(data.attachments)
    this.embeds = new Map(data.embeds);
  }
}
