const { exec } = require('child_process');
const { BUILD_DIR } = require('./constants');

const copyAssets = () => {
    console.log('Copying Assets...');
    
    exec(`
        mkdir -p ${BUILD_DIR}; 
        cp -a public/images ${BUILD_DIR};
        cp public/favicon.ico ${BUILD_DIR}/favicon.ico;
        cp public/feed.xml ${BUILD_DIR}/feed.xml;
        cp public/robots.txt ${BUILD_DIR}/robots.txt;
        cp public/sitemap.xml ${BUILD_DIR}/sitemap.xml;
    `, (err) => {
        if (err) {
            console.log('[Error] ', err);
            return;
        }

        return console.log('[Success] Copied Assets');
    })
};

module.exports = copyAssets;