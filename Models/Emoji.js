const User = require('./User.js');
const Structure = require('./Structure.js')
class Emoji extends Structure{
  constructor(client, data) {
    super(client);
    this.id = data.id;
    this.name = data.name;
    this.roles = data.roles;
    // this.creator = new User(data.user); TODO Check if creator is a thing. https://discordapp.com/developers/docs/resources/emoji#emoji-object
    // this.requireColons = data.require_colons; TODO Check if require colons is a thing. https://discordapp.com/developers/docs/resources/emoji#emoji-object
    this.managed = data.managed;
  }


}

module.exports = Emoji;
