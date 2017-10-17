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
    this.mentions = data.mentions || [];
    this.roleMentions = data.roleMentions || [];
    this.attachments = data.attachments;
    this.embeds = data.embeds;
    this.guild = 'Tuned' 
  }
}
