const TextBasedChannel = require('./TextBasedChannel.js');

/**
* A DMChannel Structure meant to control over DMChannel properties and methods
* @extends TextBasedChannel
* @param {Client} client ArtzyCord's Client instance
* @param {Object} channel A valid DMChannel data Object
* @property {String} ownerID Channel's creator
* @property {Array} recipients Array of the channel recipients
*/
class DMChannel extends TextBasedChannel {
  constructor(client, channel) {
    super(client, channel);
    this.ownerID = channel['owner_id'] ? channel['owner_id'] : null;
    this.recipients = channel['recipients'] ? channel['recipients'] : {};
  }
}

module.exports = DMChannel;
