const TextBasedChannel = require('./TextBasedChannel.js');

class GroupDM extends TextBasedChannel {
  constructor(client, data) {
    super(client, data);
    this.name = data.name;
    this.icon = data.icon;
    this.recipients = data.recipients;
    this.ownerID = data.owner_id;
  }
}
