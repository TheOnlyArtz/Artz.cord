const unirest = require('unirest');
const Constants = require('../Constants.js');
const constants = new Constants
class APIManager {
  constructor(client) {
    Object.defineProperty(this, 'client', { value: client });

    this.ratelimit = {
      retry     : 0,
      remaining : -1
    };

    this.lastRequest = 0;
    this.queue = [];
    this.queueRunning = false;
  }

  makeRequest(method, endpoint, data = null, timeout = null, files = null) {
      const that = this;
      let RequestPromise =
        new Promise(function(resolve, reject) {
          const item = {data, method, endpoint, resolve, reject}
          that.queue.push(item)
          if (!that.queueRunning) {
              that.startQueue();
          };
        });
      return RequestPromise;
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
        }

          const RequestsTimeDifference = Date.now() - this.lastRequest;
          if (RequestsTimeDifference > 1000) {
            new Promise(function(resolve, reject) {
              setTimeout(function () {
                resolve
                reject
              }, 1000);
            });

          const item = this.queue.shift()
          try {
            this.lastRequest = Date.now();
            const request = this.APIRequest(item.method, item.endpoint, item.data, item.files);
            item.resolve(request)
          } catch (e) {
            this.lastRequest = Date.now();
            item.reject(e)
          }

          }

      }
    this.queueRunning = false;
  }

  async APIRequest(method, endpoint, data, options, files) {
    let that = this;
    return new Promise((resolve, reject) => {

      const url = `${constants.HTTP.url}/v${constants.HTTP.version}/${endpoint}`;

      const headers = {
        "Authorization" : "Bot " + that.client.token,
        'User-Agent': 'TheOnlyArtz/ArtzyCord https://github.com/TheOnlyArtz/ArtzyCord/',
        "Content-type": "application/json"
      }
      const request = unirest[method](url)


      if (options && options.reason) {
        headers['X-Audit-Log-Reason'] = encodeURIComponent(that.options.reason)
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
            return Error('Please check file parameters again.')
          }
        })
      }

      if (data && data instanceof Object) {
        request.send(JSON.stringify(data))
      }

      request.end(response => {
        if (response.headers && response.headers['x-ratelimit-remaining']) {
            that.ratelimit.retry = response.headers['x-ratelimit-reset']
            that.ratelimit.remaining = response.headers['x-ratelimit-remaining']
        }
        if (response.error || response.body.errors) {
          if (response.body.errors) {
            const err = new Error(response.body.errors.name._errors[0].message);
            err.code = response.body.errors.name._errors[0].code;
            reject(err)
          } else {
            const err = new Error(response.body.message);
            err.code = response.body.message;
            err.status = response.status || null;
            reject(err)
          }
        }
        if (response.body && !response.error) {
            resolve(response.body)
        }

      })
    });
  }
}
module.exports = APIManager;
