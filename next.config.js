// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLess = require('@zeit/next-less')

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
// less webpack配置
const lessConfig = withLess({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]__[local]__[hash:base64:5]'
  }
})
const config = Object.assign({}, baseConfig, lessConfig)

module.exports = config