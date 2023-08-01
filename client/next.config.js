// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_APP_API_SERVER_URL: process.env.NEXT_APP_API_SERVER_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/calendar',
        permanent: false,
      },
    ]
  },
}
