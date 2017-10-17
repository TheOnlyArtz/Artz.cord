class ClientUser {
  constructor(client, data) {
    this.username = data.user.username
    this.id = data.user.id
    this.discriminator = "#" + data.user.discriminator
    this.verified = data.user.verified
    this.bot = data.user.bot
    console.log();
  };

  get tag() {
    return this.username + this.discriminator;
  }

}


  module.exports = ClientUser
