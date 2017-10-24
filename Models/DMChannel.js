const TextBasedChannel = require('./TextBasedChannel.js');
class DMChannel extends TextBasedChannel {
  constructor(client, channel) {
    super(client, channel);
    this.ownerID = channel['owner_id'] ? channel['owner_id'] : null;
    this.recipients = channel['recipients'] ? channel['recipients'] : {};
  }
}

module.exports = DMChannel;
