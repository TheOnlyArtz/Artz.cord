const constants = require('../../Constants.js');
const Constants = new Constants;
class Channel {
  constructor(API) {
    this.API = API;
  }

  getChannel(channelID) {
    const url = Constants.ENDPOINTS_CHANNELS.get(channelID);
    return this.API.makeRequest('get', url, {});
  }

  modifyChannel(channelID, data, reason = '') {
    const url = Constants.ENDPOINTS_CHANNELS.modify(channelID);
    return this.API.makeRequest('patch', url, {data, reason});
  }

  deleteChannel(channelID, reason = '') {
    const url = Constants.ENDPOINTS_CHANNELS.delete(channelID);
    return this.API.makeRequest('delete', url, {reason});
  }

  getChannelMessages(channelID, options = {}) {
    const url = Constants.ENDPOINTS_CHANNELS.messages.list(channelID);
    return this.API.makeRequest('get', url, {
      around: options.around || null,
      before: options.before || null,
      after: options.after || null,
      limit: options.limit || null
    });
  }

  getChannelMessage(channelID, messageID) {
    const url = Constants.ENDPOINTS_CHANNELS.messages.get(channelID, messageID)
    return this.API.makeRequest('get', url, {});
  }

  editMessage(channelID, messageID, content) {
    const url = Constants.ENDPOINTS_CHANNELS.messages.edit(channelID, messageID);
    return this.API.makeRequest('patch', url, {content});
  }

  deleteMessage(channelID, messageID, reason = '') {
    const url = Constants.ENDPOINTS_CHANNELS.messages.delete(channelID, messageID);
    return this.API.makeRequest('delete', url, {reason});
  }

  bulkDeleteMessage(channelID, snowflakes = [], reason = '') {
    const url = Constants.ENDPOINTS_CHANNELS.messages.bulkDelete(channelID, messageID);
    return this.API.makeRequest('post', url, {reason: reason, messages: snowflakes});
  }

  createMessageReaction(channelID, messageID, emoji) {
    const url = Constants.ENDPOINTS_CHANNELS.reactions.create(channelID, messageID, emoji);
    return this.API.makeRequest('put', url, {});
  }

  deleteMessageReaction(channelID, messageID, emoji) {
    const url = Constants.ENDPOINTS_CHANNELS.(channelID, messageID, emoji);
    return this.API.makeRequest('delete', url, {});
  }

  deleteMessageUserReaction(channelID, messageID, emoji, userID) {
    const url = Constants.ENDPOINTS_CHANNELS.(channelID, messageID, emoji, userID);
    return this.API.makeRequest('delete', url, {});
  }

  Message(channelID) {
    const url = Constants.ENDPOINTS_CHANNELS.(channelID, messageID);
    return this.API.makeRequest('', url, {});
  }

}

module.exports = Channel
