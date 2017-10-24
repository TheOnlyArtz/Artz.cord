const Presence = require('./Presence.js');

class PresenceStore {
	constructor(client, iterable) {
		this.iterable = iterable;
		Object.defineProperty(this, 'client', {value: client});
	}

	_cache() {
		const that = this;

		if (this.iterable && Array.isArray(this.iterable)) {
			this.iterable.forEach(i => {
				this.client.presences.set(i.user.id, new Presence(that.client, i));
			});
		}
	}
}

module.exports = PresenceStore;
