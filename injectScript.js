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
    console.log(`have file ${filePath}`)

    // Check if it's an HTML file
    if (path.extname(file) === '.html') {
        console.log(`Injecting script into ${filePath}`)

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

    // Read the script content from a file
    const scriptFilePath = path.join(__dirname, 'script.js');
    const scriptContent = fs.readFileSync(scriptFilePath, 'utf8');
    console.log(`scriptContent ${scriptContent}`)


    // Create the script tag with the file content
    const scriptTag = `${scriptContent}`;

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
