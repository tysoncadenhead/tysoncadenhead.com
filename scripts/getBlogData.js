const fs = require('fs');
const path = require('path');
const marked = require('marked');

const getBlogData = () => {
    const data = {};
    const years = fs.readdirSync(path.resolve(__dirname, '../src/blog'));

    years.forEach(year => {
        const months = fs.readdirSync(path.resolve(__dirname, `../src/blog/${year}`));

        months.forEach(month => {
            const days = fs.readdirSync(path.resolve(__dirname, `../src/blog/${year}/${month}`));

            days.forEach(day => {
                const posts = fs.readdirSync(path.resolve(__dirname, `../src/blog/${year}/${month}/${day}`))
                    .filter(file => file.indexOf('.json') !== -1)
                    .map(file => file.replace('.json', ''));

                posts.forEach(slug => {
                    const url = `/blog/${year}/${month}/${day}/${slug}`;
                    const file = require(path.resolve(__dirname, `../src${url}.json`));
                    const originalFile = fs.readFileSync(path.resolve(__dirname, `../src${url}.md`), 'utf8');
                    const post = marked(originalFile);
                    const config = Object.assign({}, file, {
                        url,
                        slug,
                        year,
                        month,
                        day,
                        path: url,
                        post,
                        date: `${month}/${day}/${year}`,
                        preview: file.preview || originalFile.split('<!-- more -->')[0],
                        thumbnail: file.thumbnail || `/images/blog/${slug}.jpg`
                    });

                    data[slug] = config;
                });
            });
        });
    });

    return data;
};

module.exports = getBlogData;