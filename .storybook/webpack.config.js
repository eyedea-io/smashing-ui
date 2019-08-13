const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = function({config}) {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, '../packages'),
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', {flow: false, typescript: true}]]
        }
      },
      require.resolve('react-docgen-typescript-loader')
    ]
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  })

  config.resolve = Object.assign(config.resolve, {
    alias: {
      '@smashing/*': resolve('../packages/*')
    }
  })

  return config
}
