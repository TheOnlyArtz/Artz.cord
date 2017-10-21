const request = require('request');
const Constants = require('../Constants');

class ApiRequest {
	constructor(client, method, endpoint, options) {
		this.client = client;
		this.method = method;
		this.endpoint = endpoint;
		this.options = {};
	}

	get RequestEndpoint() {
		return this.endpoint;
	}

	request() {
		const url = `${Constants.HTTP.url}/v${Constants.HTTP.version}/${this.RequestEndpoint()}`;

		const RequestOptions = {
			headers: {
				'User-Agent': 'TheOnlyArtz/ArtzyCord https://github.com/TheOnlyArtz/ArtzyCord/',
				Authorization: 'Bot ' + this.client.token
			}
		};

		const request = snekfetch[this.method](url);

		request.set('Authorization', RequestOptions.headers.Authorization);
		request.set('User-Agent', RequestOptions.headers['User-Agent']);

		if (this.options.headers) {
			request.set(this.options.headers);
		}
		if (this.options.reason) {
			request.set('X-Audit-Log-Reason', encodeURIComponent(this.options.reason));
		}

		if (this.options.files) {
			this.options.files.forEach(file => {
				request.attach(file);
				if (typeof this.options.data !== 'undefined') {
					request.attach('payload_json', JSON.stringify(this.options.data));
				}
			});
		} else {
			request.send(this.options.data);
		}

		return request;
	}

}

module.exports = ApiRequest;
