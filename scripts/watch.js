const watch = require('node-watch');
const path = require('path');
const copyAssets = require('./copyAssets');
const compile = require('./compile');

watch(path.resolve(__dirname, '../src'), { recursive: true }, (evt, name) => {
    console.log('%s changed.', name);

    compile();
});

watch(path.resolve(__dirname, '../public'), { recursive: true }, (evt, name) => {
    console.log('%s changed.', name);

    copyAssets();
});