const unirest = require('unirest');
const Constants = require('../Constants');
class APIManager {
  constructor(client) {
    Object.defineProperty(this, 'client', client);
    this.ratelimit = {
      retry     : 0,
      remaining : -1
    };

    this.lastRequest = 0;
    this.queue = [];
    this.queueRunning = false;
  }

  _addQueueItem(endpoint, method, timeout = null, data = null, files = null) {
      let RequestPromise =
        new Promise(function(resolve, reject) {
          const item = {data, method, endpoint, resolve, reject}

          if (!this.queueRunning) {
              this.startQueue();
          };
        });
  }

  startQueue() {
      this.queueRunning = true;

      while (this.queue.length > 0) {
        while(this.ratelimit.remaining === 0) {
          if (this.ratelimit.remaining <= Date.now()) break;

          const timeout = Date.now() - this.ratelimit.retry
          new Promise(function(resolve, reject) {
            setTimeout(function () {
              resolve
              reject
            }, Math.min(1000, timeout));
          });

          const RequestsTimeDifference = Date.now() - this.lastRequest;
          if (RequestsTimeDifference > 1000) {
            new Promise(function(resolve, reject) {
              setTimeout(function () {
                resolve
                reject
              }, Math.min(timeout, 1000));
            });

          const item = this.queue.shift()
          try {
            this.lastRequest = Date.now();
            const request = await this._APIRequest(item.method, item.endpoint, item.data, item.files);
            item.resolve(request)
          } catch (e) {
            this.lastRequest = Date.now();
            item.reject(e)
          }

          }

        }
      }
    this.queueRunning = false;
  }

  async APIRequest(method, endpoint, data, options, files) {
    const url = `${Constants.HTTP.url}/v${Constants.HTTP.version}/${this.RequestEndpoint()}`;

    const headers = {
      "Authorization" : "Bot " + this.client.token,
      'User-Agent': 'TheOnlyArtz/ArtzyCord https://github.com/TheOnlyArtz/ArtzyCord/',
    }
    const request = unirest[method](url)


    if (this.options.reason) {
      headers['X-Audit-Log-Reason'] = encodeURIComponent(this.options.reason)
    }
    request.headers(headers);

    if (files && files instanceof Array) {

      files.forEach(o => {
        if (o instanceof Object) {
          throw Error('Files must be objects including name and path as params.')
        }
        if (o.name && o.path) {
          request.attach(o.name, o.path)

        } else {
          return throw Error('Please check file parameters again.')
        }
      })
    }

    if (data && data instanceof Object) {
      request.send(JSON.stringify(data))
    }

    return request;
  }
}
