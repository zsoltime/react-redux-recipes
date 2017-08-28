const webpackConfig = require('./webpack.config.js');

module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'src/tests/**/*.test.+(js|jsx)',
    ],
    preprocessors: {
      'src/tests/**/*.test.+(js|jsx)': [
        'webpack',
        'sourcemap',
      ],
    },
    reporters: ['mocha'],
    client: {
      mocha: {
        timeout: '5000',
      },
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
