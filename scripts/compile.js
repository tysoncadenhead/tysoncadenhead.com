const compileBlogPosts = require('./compileBlogPosts');
const compilePages = require('./compilePages');

const compile = () => {
    compileBlogPosts();
    compilePages();
};

module.exports = compile;