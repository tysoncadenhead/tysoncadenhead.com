const browserSync = require('browser-sync').create();
const path = require('path');
const { BUILD_DIR } = require('./constants');

const buildPath = path.resolve(__dirname, `../${BUILD_DIR}`);

browserSync.init({
    port: 7777,
    server: [
        buildPath
    ]
});

browserSync.watch(buildPath).on('change', browserSync.reload);