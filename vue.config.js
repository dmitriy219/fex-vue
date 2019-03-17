module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/j_': {
        target: 'https://fex.net',
        changeOrigin: true
      },
      '^/signin': {
        target: 'https://api.fex.net/api/v1/auth',
        changeOrigin: true
      },
      '^/signout': {
        target: 'https://api.fex.net/api/v1/auth',
        changeOrigin: true
      },
      '^/load': {
        target: 'https://fex.net',
        changeOrigin: true
      },
      '^/show': {
        target: 'https://fex.net',
        changeOrigin: true,
        logLevel: 'info'
      },
      '^/upload': {
        target: 'https://fs2.fex.net:8080/',
        changeOrigin: true
      }
    }
  }
}