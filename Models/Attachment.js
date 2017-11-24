const Structure = require('./Structure.js');

/**
* An Attachment Structure meant to control over Attachments properties and methods
* @extends Structure
* @param {Object} client ArtzyCord's Client instance
* @param {Object} data A valid Attachment data Object
*/
class Attachment extends Structure{
  constructor(client, data) {
    super(client);
    this.width = data.width;
    this.height = data.height;
    this.url = data.url;
    this.size = data.size;
    this.id = data.id;
    this.name = data.filename;
  }
}

module.exports = Attachment;
