// next.config.js
module.exports = {
  env: {
    MYSQL_HOST: '127.0.0.1',
    MYSQL_PORT: '3306',
    MYSQL_DATABASE: 'ethical',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: '',
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
}
