const fs = require('fs');
const path = require('path');

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

    // Read the script content from a file
    const scriptFilePath = path.join(__dirname, 'script.js');
    const scriptContent = fs.readFileSync(scriptFilePath, 'utf8');

    // Create the modified content by inserting the script tag under the header
    const modifiedContent = data.replace(/(<\/head[^>]*)/i, `\n${scriptContent}\n$1`);
    // Save the modified content back to the file
    fs.writeFile(filePath, modifiedContent, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      console.log(`Script injected successfully into ${filePath}`);
    });
  });
}
