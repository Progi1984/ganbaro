var Encore = require('@symfony/webpack-encore');
var webpack = require('webpack');

Encore
    // Directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // Public path used by the web server to access the output path
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // Enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')
    //.addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // Enables Sass/SCSS support
    .enableSassLoader()
    // Provide jQuery
    .autoProvidejQuery()

    //.addEntry('app', './assets/js/app.js')
    .addEntry('app_dashboard', './assets/js/app_dashboard.js')
    .addEntry('login', './assets/js/login.js')

    .splitEntryChunks()
    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG : https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .enableBuildNotifications()
;

// export the final configuration
module.exports = Encore.getWebpackConfig();
