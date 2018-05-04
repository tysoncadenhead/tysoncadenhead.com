const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const getPartials = () => {
    const dirPath = path.resolve(__dirname, '../src/partials');
    const partialTemplatePaths = fs.readdirSync(dirPath);

    partialTemplatePaths.forEach((current) => {
        handlebars.registerPartial(current.split('.')[0], 
            fs.readFileSync(path.resolve(__dirname, `../src/partials/${current}`), 'utf8')
        );
    });
}

module.exports = getPartials;