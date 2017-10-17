class ClientUser

  constructor: (client, data) ->
    this.username = data.user.username
    this.id = data.user.id
    this.discriminator = data.user.discriminator
    this.verified = data.user.verified
    this.bot = data.user.bot
    client.readyUnix = Date.now()
    console.log data
  uptime: () -> return (Date.now() - this.client.readyUnix);

  module.exports = ClientUser
