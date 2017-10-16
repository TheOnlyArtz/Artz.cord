class ClientUser

  constructor: (client, data) ->
    this.username = data.username
    this.id = data.id
    this.discriminator = data.discriminator

  module.exports = ClientUser
