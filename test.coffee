Dlient = (require ('./Client.coffee'));
Client = new Dlient

Client.login "MzI3MDI4MjgzMTI2MzE3MDY2.DMVI9Q.FMXzY3iYrwEWqNFsCzr0D3VSelM"
Client.on 'ready', () ->
  console.log 'Ready to work!'
