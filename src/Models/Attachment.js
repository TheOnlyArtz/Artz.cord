const Structure = require('./Structure.js');

/**
* An Attachment Structure meant to control over Attachments properties and methods
* @extends Structure
* @param {Object} client ArtzyCord's Client instance
* @param {Object} data A valid Attachment data Object
* @property {Number?} width width of the file (if image)
* @property {Number?} height height of the file (if image)
* @property {String} url URL of the Attachment
* @property {Number} size Size of file (Units: bytes)
* @property {String} id ID of the Attachment
* @property {String} name Name of the Attachment 
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
