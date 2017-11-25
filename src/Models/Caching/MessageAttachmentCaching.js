const Box = require('../Box.js');
const Attachment = require('../Attachment');
class MessageAttachmentCaching {
  constructor(client, message, iterable) {
    if (iterable) {
      if (iterable instanceof Box) {
        message.attachments = new Box(iterable);
      } else {
        message.attachments = new Box;

        for (let attachment of iterable) {
          message.attachments.set(attachment.id, new Attachment(client, attachment));
        }

      }
    }
    return message.attachments
  }
}

module.exports = MessageAttachmentCaching;
