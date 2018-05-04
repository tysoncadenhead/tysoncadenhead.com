const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const migrate = () => {
    const data = require('../src/_blog/_data.json');

    console.log('migrate', data);

    Object.keys(data).forEach(key => {
        const markdownFile = fs.readFileSync(path.resolve(__dirname, `../src/_blog/${key}.md`), 'utf8');

        // console.log('file', markdownFile);
        const item = data[key];
        const date = item.date.split('-');
        const filePath = path.resolve(__dirname, `../src/blog/${date[2]}/${date[0]}/${date[1]}`);

        mkdirp(filePath, (err) => {
            if (!err) {
                fs.writeFileSync(`${filePath}/${key}.json`, JSON.stringify(item));
                fs.writeFileSync(`${filePath}/${key}.md`, markdownFile);
            }
        });

        console.log(filePath);
    });
};

migrate();