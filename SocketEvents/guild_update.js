const path = require('path')
const Basic = require(path.join(__dirname, 'basic.js'));
const Guild = require('../Models/Guild.js')
class Guild_Update extends Basic {
  constructor(client) {
    super(client)
  }
  handle(packet) {
    const guild = this.client.guilds.get(packet.id)
    guild.patchRaw(packet)
    this.client.emit('Guild_Update', guild)
  }
}

module.exports = Guild_Update
