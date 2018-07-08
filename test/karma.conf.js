const webpackConfig = require('../webpack.config.js');

module.exports = (config) => {
  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    reporters: ['junit', 'spec'],
    port: 8080,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS',
    ],

    // list of files / patterns to load in the browser
    files: [
      'test/test.entrypoint.js',
    ],

    // list of files / patterns to exclude
    exclude: [],

    preprocessors: {
      'test/test.entrypoint.js': ['webpack', 'sourcemap'],
    },

    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: 'inline',
      },
      filename(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName(file) {
        return file.originalPath;
      },
    },

    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
      module: webpackConfig.module,
      plugins: webpackConfig.plugins,
    },

    webpackMiddleware: {
      noInfo: true,
    },
  });
};
