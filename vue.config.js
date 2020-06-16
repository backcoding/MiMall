module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  productionSourceMap: false,
  // 删除预加载，真正的按需
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  }
}