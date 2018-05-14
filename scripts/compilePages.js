const fs = require('fs');
const path = require('path');
const getBlogData = require('./getBlogData');
const handlebars = require('handlebars');
const getPartials = require('./getPartials');
const { BUILD_DIR } = require('./constants');
const mkdirp = require('mkdirp');

const compilePages = () => {
    console.log('Compiling Pages...');

    getPartials();

    const blogData = getBlogData();
    
    const props = {
        posts: Object.keys(blogData).map(key => blogData[key]).reverse()
    };

    const pages = fs.readdirSync(path.resolve(__dirname, '../src/pages'));
    const handlebars = require('handlebars');

    pages.forEach(page => {
        const file = fs.readFileSync(path.resolve(__dirname, `../src/pages/${page}`), 'utf8');
        const title = page.replace('.hbs', '');
        const template = handlebars.compile(file)(Object.assign({
            title
        }, props));

        const destination = page === 'index.hbs' ? BUILD_DIR : `${BUILD_DIR}/${title}`;

        mkdirp(destination, (err) => {
            if (!err) {
                fs.writeFileSync(`${destination}/index.html`, template);
            }
        });
    });
};

module.exports = compilePages;