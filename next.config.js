/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withLess = require('@zeit/next-less')
const withLess = require('@zeit/next-less')
const cssGetLocalIndent = require('@zeit/next-css/node_modules/css-loader/lib/getLocalIdent')
const lessToJS = require('less-vars-to-js')
const path = require('path')
const fs = require('fs')

const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  // 设置环境变量，可以通过process.env.wx获取到值
  env: {
    wx: 'abcdddd'
  },
  // 支持page页面的扩展名称
  // pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  // 如果需要添加线上前缀
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
  // 可以支持serverless构建
  target: 'server', // or 'serverless'
  poweredByHeader: false // 禁止在header上输入x-powered-by
}

const varibaryAntd = lessToJS(fs.readFileSync(path.resolve(__dirname, './src/assets/antd.custom.less'), 'utf8'))
// less webpack配置
const lessConfig = withLess({
  cssModules: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: varibaryAntd
  },
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]__[local]__[hash:base64:5]',
    getLocalIdent: (context, localIdentName, localName, options) => {
      let hz = context.resourcePath.replace(context.rootContext, '')
      console.log('hz:', hz)
      if (/node_modules/.test(hz)) {
        return localName
      } else {
        return cssGetLocalIndent(context, localIdentName, localName, options)
      }
    }
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      const openBrowser = require('open-browser-webpack-plugin')
      config.plugins.push(
        new openBrowser({
          url: 'http://localhost:3000'
        })
      )
    } else {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }
    return config
  }
})
const config = Object.assign({}, baseConfig, lessConfig)

module.exports = config