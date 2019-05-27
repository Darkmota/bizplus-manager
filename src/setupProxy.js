const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/lang/', { target: 'http://localhost:1889/' }));
}
