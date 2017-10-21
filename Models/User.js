class User {
	constructor(client, data) {
		this.id = data.id;
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.avatar = data.avatar;
		this.bot = data.bot;
		this.mfaEnabled = data.mfa_enabled;
		this.verified = data.verified;
		this.email = data.email;
	}
}

module.exports = User;
