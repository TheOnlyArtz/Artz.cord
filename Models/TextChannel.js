const snekfetch = require('snekfetch')
class TextChannel {
  constructor(client, data) {
    this.type = 'text'
  }

  get name() {
    if (data.name) {
      return data.name;
    } else {
      return 'Unknown';
    };
  };

  send(toSend, options) {
    return new Promise(async function(resolve, reject) {
    let content;

    if (!toSend) throw Error('Can\'t send an empty message');
    if (!options.tts) options.tts = false;
    if (!options.markup) content = toSend;

    if (typeof options.markup !== 'undefined' && (typeof options.markup !== 'boolean' || options.markup === true)) {

      }

    }
  });
}
