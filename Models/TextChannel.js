const {get, put, patch, post} = require('snekfetch')
class TextChannel {
  constructor(client, data) {
    this.type = data.type;
    this.guildID = data.guild_id;
    this.name = data.name;
    this.position = data.position;
    this.permissionOverwrites = data.permission_overwrites;
    this.nsfw = data.nsfw;
    this.topic = data.topic;
    this.lastMessageID = this.last_message_id;
    this.parentMessageID = data.parent_id;

    this.client = client;
    this.data = data;
  }

  // get name() {
  //   if (this.name) {
  //     return this.name;
  //   } else {
  //     return 'Unknown';
  //   };
  // };

  send(toSend, options) {
    let that = this;
    return new Promise(async function(resolve, reject) {
    let payload = {};
    if (!toSend) throw Error('Can\'t send an empty message');
    if (!options) options = {}
    if (!options.tts) options.tts = false;

    if (typeof options.markup !== 'undefined' && (typeof options.markup !== 'boolean' || options.markup === true)) {
        payload.content = `
        \`\`\`${typeof options.markup === true ? '' : options.markup}
          ${toSend}
        \`\`\`
        `
      } else {
        payload.content = toSend;
      }

    if (typeof options.tts === 'boolean' && options.tts === true) {
        payload.tts = true;
      } else {
        payload.tts = false;
      }
    post(`https://discordapp.com/api/v6/channels/${that.data.id}/messages`)
      .set('Authorization', 'Bot ' + that.client.token)
      .send(payload)
      .then(r => resolve(r.body))
      .catch(e => reject(e))
    });
  }
}

module.exports = TextChannel
