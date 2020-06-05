const jimp = require('jimp');
const fs = require('fs');
const path = require('path');

var pathToBMP = __dirname;
var pathToPNG = path.join(pathToBMP, 'PNG');

function readCommandArguments() {
    return new Promise((resolve) => {
        var args = process.argv.slice(2);
        if(typeof args[0] !== 'undefined' && args[0]) {
            pathToBMP = path.join(args[0]);
        }
        resolve(args);
    });
}

function readFiles() {
    return new Promise((resolve) => {
        fs.readdir(pathToBMP, (err, bmpFiles) => {
            if(err) {
                return console.log('Unable to scan directory: ' + err);
            }

            console.log('Converting ' + bmpFiles.length + ' images. Please wait... ');
            bmpFiles.forEach((bmpFile) => {
                convertFiles(path.join(bmpFile));
            })
            resolve();
        });
    });
}

function convertFiles(bmpFile) {
    return new Promise((resolve) => {
        var pathBMP = path.join(pathToBMP, bmpFile);
        jimp.read(pathBMP, ((err, image) => {
            if(err) {
            } else {
                var fileNameWithoutExtension = bmpFile.split('.').slice(0, -1).join('.');
                var newFilename = fileNameWithoutExtension + '.png';
                image.write(path.join(pathToPNG, newFilename));
            }
            resolve();
        }));
    });
}

async function runConverter() {
    await readCommandArguments();
    await readFiles();
}

runConverter();
