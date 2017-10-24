Discord = (require ('./index.js'));
Client = new Discord.Client();
Embed = new Discord.EmbedMessage();
Client.on 'ready', () ->
	console.log "I'm ready!!!!"
	Client.user.setStatus('idle')
	Client.user.setGame({
		name: 'setGame function works',
		url: 'https://twitch.tv/theonlyartz'
	})

Client.on 'Channel_Create', (t) ->
	console.log t


prefix = '!'
Client.on 'Message_Create', (message) ->
	return if message.author.bot
	Embed.createField('title', 'value', true)
	console.log Embed



Client.login "MzY5ODI1MzY5NTAwNjgwMTkz.DMeU4Q.jbBCAVeigWzj1ru-YLGcp2m6MgI" #NOTE: I dont really care if you see this token.
