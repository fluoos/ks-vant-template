module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  assetsDir: './',
  publicPath: './',
  css: {
    loaderOptions: {
      scss: {
        // 预处理器 loader import 样式
        prependData: '@import "~@/assets/style/variables.scss";'
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page'
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // 如果需要多页面，未来可以在这里做多页面
    // subpage: {
    //   entry: 'src/subpage/main.ts',
    //   template: 'public/subpage.html',
    //   filename: 'subpage.html'
    // }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.3.121:5001', // 要访问的跨域的域名
        ws: true,
        secure: false, // 使用的是http协议则设置为false，https协议则设置为true
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
