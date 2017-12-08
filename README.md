# Artz.cord
The most shittiest API *rapper out there.

# Examples

```js
//setGame

const Discord = require('artzycord');
const Client = new Discord.Client();

client.on('ready', () => {
	client.user.setGame({
		name: "With ArtzyCord"
	});

	console.log("Socket connected, Client is ready!")
})

client.connect("TOKEN")
```
