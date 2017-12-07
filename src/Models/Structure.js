/**
* @param {Client} client ArtzyCord's Client instance
*/
class Structure {
	constructor(client) {
		Object.defineProperty(this, 'client', {value: client});
	}
}

module.exports = Structure;
