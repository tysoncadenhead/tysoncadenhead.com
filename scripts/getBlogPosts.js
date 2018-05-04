const fs = require('fs');
const path = require('path');
const marked = require('marked');

const getBlogPosts = () => {
    const years = fs.readdirSync(path.resolve(__dirname, '../src/blog'));

    const directories = [];
    
    years.forEach((year) => {
        const months = fs.readdirSync(path.resolve(__dirname, `../src/blog/${year}`))
            .filter(folderName => folderName.indexOf('.') === -1);
        
        months.forEach((month) => {

            const days = fs.readdirSync(path.resolve(__dirname, `../src/blog/${year}/${month}`));

            days.forEach((day) => {

                fs.readdirSync(
                    path.resolve(__dirname, `../src/blog/${year}/${month}/${day}`)).filter(fileName =>
                        fileName.split('.')[1] === 'md'
                    )
                    .map(fileName => fileName.replace('.md', ''))
                    .forEach((fileName) => {
                        const config = require(path.resolve(__dirname, `../src/blog/${year}/${month}/${day}/${fileName}.json`));
                        const originalFile = fs.readFileSync(path.resolve(__dirname, `../src/blog/${year}/${month}/${day}/${fileName}.md`), 'utf8');
                        const post = marked(originalFile);
    
                        directories.push(Object.assign({}, config, {
                            slug: fileName,
                            year: year,
                            month: month,
                            day: day,
                            path: `/blog/${year}/${month}/${day}`,
                            post: post
                        }));
                }   );

            });

            
        });
    });

    return directories;
};

module.exports = getBlogPosts;