const User = require('./User.js');

class UserCaching {
	constructor(client, iterable) {
		Object.defineProperty(this, 'client', {value: client});
		this.iterable = iterable;
	}

	_cache() {
		if (this.iterable && Array.isArray(this.iterable)) {
			this.iterable.forEach(i => {
				this.client.users.set(i.user.id, new User(this.client, i.user));
				// TODO: Make this.members inside guild to return here a new instance of it.
			});
		}
	}

}

module.exports = UserCaching;
