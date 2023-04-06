const PROXY_CONFIG = [
  {
    "/api/*": {
      "target": "http://localhost:8952",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true
  }
}
];

module.exports = PROXY_CONFIG;
