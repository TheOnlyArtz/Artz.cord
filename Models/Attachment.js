class Attachment {
  constructor(client, data) {
    this.width = data.width;
    this.height = data.height;
    this.url = data.url;
    this.size = data.size; //TODO: Check size units
    this.id = data.id;
    this.name = data.filename;
  }
}

module.exports = Attachment;
