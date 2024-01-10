const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const docsFolder = path.join(__dirname, 'docs');

fs.readdir(docsFolder, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(docsFolder, file);

    // Check if it's an HTML file
    if (path.extname(file) === '.html') {
      injectScript(filePath);
    }
  });
});

function injectScript(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const $ = cheerio.load(data);

    // Modify this line to customize the script tag you want to inject
    const scriptTag = '<script src="your-script.js"></script>';

    // Insert the script tag under the header tag
    $('head').append(scriptTag);

    // Save the modified content back to the file
    fs.writeFile(filePath, $.html(), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      console.log(`Script injected successfully into ${filePath}`);
    });
  });
}
