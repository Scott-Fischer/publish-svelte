"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUp = exports.deleteFolderRecursive = void 0;
const fs_1 = require("fs");
const ts_config_creator_1 = require("./creators/ts-config-creator");
function deleteFolderRecursive(path) {
    var files = [];
    if (fs_1.existsSync(path)) {
        files = fs_1.readdirSync(path);
        files.forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs_1.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            }
            else { // delete file
                fs_1.unlinkSync(curPath);
            }
        });
        fs_1.rmdirSync(path);
    }
}
exports.deleteFolderRecursive = deleteFolderRecursive;
function cleanUp(opts) {
    if (opts.keepBundle) {
        return;
    }
    //let files = ['index.js', 'index.mjs', opts.componentName + ".svelte", "package.json", "README.md"];
    deleteFolderRecursive(opts.outputDir);
    fs_1.unlinkSync(ts_config_creator_1.getTsConfigPath(opts));
}
exports.cleanUp = cleanUp;
//# sourceMappingURL=clean-up.js.map