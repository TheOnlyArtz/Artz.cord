Dlient = (require ('./Client.coffee'));
Client = new Dlient

Client.login "MzY5ODI1MzY5NTAwNjgwMTkz.DMeU4Q.jbBCAVeigWzj1ru-YLGcp2m6MgI"
Client.on 'ready', () ->
  console.log 'Ready to work! as ' + Client.user.tag

Client.on 'Message_Create', (message) ->
  console.log message.content;
