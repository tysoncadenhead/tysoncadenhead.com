const { exec } = require('child_process');

const copyAssets = () => {
    exec(`
        mkdir -p build; 
        cp -a public/images build;
        cp public/favicon.ico build/favicon.ico;
        cp public/feed.xml build/feed.xml;
        cp public/robots.txt build/robots.txt;
        cp public/sitemap.xml build/sitemap.xml;
    `, (err) => {
        if (err) {
            console.log('[Error] ', err);
            return;
        }

        return console.log('[Success] Copied Assets');
    })
};

copyAssets();