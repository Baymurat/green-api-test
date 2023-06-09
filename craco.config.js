const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@custom-types': path.resolve(__dirname, 'src/custom-types'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
    configure: {
      resolve: {
        fallback: {
          "fs": false,
          "os": false,
          "path": false,
        }
      }
    },
  }
}
