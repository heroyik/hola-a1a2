const fs = require('fs');
const path = require('path');

const imgDir = 'images';
const files = fs.readdirSync(imgDir);

files.forEach(file => {
    let newName = null;
    if (file.endsWith('_v55.png')) newName = file.replace('_v55.png', '_v2_1.png');
    else if (file.endsWith('_v56.png')) newName = file.replace('_v56.png', '_v2_1.png');
    else if (file.endsWith('_v2_1_v2_1.png')) newName = file.replace('_v2_1_v2_1.png', '_v2_1.png');
    else if (file.endsWith('_v52.png')) newName = file.replace('_v52.png', '_v2_1.png'); // catch other older ones

    if (newName) {
        const oldPath = path.join(imgDir, file);
        const newPath = path.join(imgDir, newName);
        if (!fs.existsSync(newPath)) {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${file} -> ${newName}`);
        } else {
            console.log(`Skipped (already exists): ${newName}`);
        }
    }
});
