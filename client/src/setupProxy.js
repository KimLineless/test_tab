const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      // 송희씨 ip
      // target: "http://192.168.219.103:3001",
      target: "http://localhost:3001",
      // target:"http://112.145.7.170:33001",
      changeOrigin: true
    })
  )
}
