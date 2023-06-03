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
}
