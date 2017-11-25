const Long = require('long');

const EPOCH = 1420070400000;
class Snowflake {
	constructor() {

	}

	static deconstruct(snowflake) {
		const BINARY = pad(Long.fromString(snowflake).toString(2), 64);
		const res = {
			timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
			workerID: parseInt(BINARY.substring(42, 47), 2),
			processID: parseInt(BINARY.substring(47, 52), 2),
			increment: parseInt(BINARY.substring(52, 64), 2),
			binary: BINARY
		};

		return res;

		function pad(v, n, c = '0') {
			return String(v).length >= n ? String(v) : (String(c).repeat(n) + v).slice(-n);
		}
	}

}

module.exports = Snowflake;
