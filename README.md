# ArtzyCord
The most shittiest API *rapper out there.

# Examples

```js
//setGame

const discord = require('artzycord');
const Client = new discord();

discord.on('ready', () => {
	client.user.setGame({
		name: "With ArtzyCord"
	});

	console.log("Socket connected, Client is ready!")
})
```