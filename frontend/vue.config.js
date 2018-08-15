module.exports = {
  productionSourceMap: false,
  // baseUrl:
  //   process.env.NODE_ENV === "production"
  //     ? "https://cdn.zoocer.com/dist/"
  //     : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true
      }
    }
  }
};
