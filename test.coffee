Dlient = (require ('./Client.coffee'));
Client = new Dlient({
	presence: {
		status: 'dnd'
	}
})

Client.login "MzY5ODI1MzY5NTAwNjgwMTkz.DMeU4Q.jbBCAVeigWzj1ru-YLGcp2m6MgI" #NOTE: I dont really care if you see this token.
Client.on 'ready', () ->
	console.log "I'm ready!!!!"
	Client.user.setStatus('idle')
	Client.user.setGame({
		name: 'setGame function works',
		url: 'https://twitch.tv/theonlyartz'
	})

Client.on 'Message_Create', (message) ->
	console.log('opened with a message')

Client.on 'close', (e) ->
	console.log('Socket closed')