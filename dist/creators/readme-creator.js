"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadmeFiles = exports.deleteReadmeVersionFile = exports.README_FILENAME = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const templates_1 = require("./templates");
const pelte_util_1 = require("../pelte-util");
exports.README_FILENAME = 'README.md';
function deleteReadmeVersionFile(opts) {
    fs_1.unlinkSync(pelte_util_1.changeExtension(opts.srcFile, 'md'));
}
exports.deleteReadmeVersionFile = deleteReadmeVersionFile;
function createReadmeFiles(opts) {
    const readMeFile = pelte_util_1.changeExtension(opts.srcFile, 'md');
    const mdExists = fs_1.existsSync(path_1.join(readMeFile));
    const readMeString = mdExists ?
        pelte_util_1.readFileUtf8(readMeFile) :
        templates_1.createReadmeFromOpts(opts);
    pelte_util_1.createDir(opts);
    if (!opts.init) {
        fs_1.writeFileSync(path_1.join(opts.outputDir, exports.README_FILENAME), readMeString);
    }
    fs_1.writeFileSync(pelte_util_1.changeExtension(opts.srcFile, 'md'), readMeString);
}
exports.createReadmeFiles = createReadmeFiles;
//# sourceMappingURL=readme-creator.js.map