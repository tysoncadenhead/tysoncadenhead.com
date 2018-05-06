const getBlogPosts = require('./getBlogPosts');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const getPartials = require('./getPartials');
const { BUILD_DIR } = require('./constants');

const compileBlogPosts = () => {
    console.log('Compiling Blog Posts...');
    
    getPartials();
    
    const blogPostLayout = fs.readFileSync(path.resolve(__dirname, `../src/layouts/blogPost.hbs`), 'utf8');
    const template = handlebars.compile(blogPostLayout);

    const blogPosts = getBlogPosts();

    blogPosts.forEach(blogPost => {
        const filePath = path.resolve(__dirname, `../${BUILD_DIR}/${blogPost.path}/${blogPost.slug}`);
        const legacyFilePath = path.resolve(__dirname, `../${BUILD_DIR}/blog/${blogPost.slug}`);
        
        mkdirp(filePath, (err) => {
            if (!err) {
                fs.writeFileSync(`${filePath}/index.html`, template(blogPost));
                console.log('[Success]', `Compiled ${blogPost.slug}`);
            } else {
                console.log('[Error]', err);
            }
        });

        mkdirp(legacyFilePath, (err) => {
            if (!err) {
                fs.writeFileSync(`${legacyFilePath}/index.html`, template(blogPost));
                console.log('[Success]', `Compiled ${blogPost.slug} legacy`);
            } else {
                console.log('[Error]', err);
            }
        });
    });

};

module.exports = compileBlogPosts;