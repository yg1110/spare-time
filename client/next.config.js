// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/calendar',
        permanent: false,
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
