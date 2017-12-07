const User = require('./User.js');
const Structure = require('./Structure.js')
const Box = require('./Box.js')
/**
* An Emoji Structure meant to control over emojis properties and methods
* @extends Structure
* @param {Client} client ArtzyCord's Client instance
* @param {Object} data A valid Emoji data Object
* @property {String} id Emoji's ID
* @property {String} name Emoji's name
* @property {Box} roles Emoji's roles
* @property {Boolean} managed Whether the Emoji is managed or not
*/
class Emoji extends Structure{
  constructor(client, data) {
    super(client);
    this.id = data.id;
    this.name = data.name;
    this.roles = new Box;

    data.roles.forEach(e => {
      this.roles.set(e.id, e);
    })
    // this.creator = new User(data.user); TODO Check if creator is a thing. https://discordapp.com/developers/docs/resources/emoji#emoji-object
    // this.requireColons = data.require_colons; TODO Check if require colons is a thing. https://discordapp.com/developers/docs/resources/emoji#emoji-object
    this.managed = data.managed;
  }

  async delete() {

  }

  async changeName() {

  }

  async modify() {

  }

}

module.exports = Emoji;
