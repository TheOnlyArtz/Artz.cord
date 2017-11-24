const TextBasedChannel = require('./TextBasedChannel.js');

/**
* A GroupDM Structure meant to control over GroupDM properties and methods
* @extends TextBasedChannel
* @param {Object} client ArtzyCord's Client instance
* @param {Object} data A valid GroupDM data Object
*/
class GroupDM extends TextBasedChannel {
  constructor(client, data) {
    super(client, data);
    this.name = data.name;
    this.icon = data.icon;
    this.recipients = data.recipients;
    this.ownerID = data.owner_id;
  }
}
