"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPelteOptionsFromJsonPath = exports.extractPelteOptionsFromJson = exports.createPackageFile = exports.generatePackageObject = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("../constants");
const pelte_util_1 = require("../pelte-util");
function generatePackageObject(opts) {
    return {
        name: opts.packageName,
        version: opts.packageVersion,
        svelte: opts.componentName + ".svelte",
        main: constants_1.INDEX_UMD,
        module: constants_1.INDEX_ES
    };
}
exports.generatePackageObject = generatePackageObject;
function createPackageFile(opts) {
    const json = generatePackageObject(opts);
    const jsonPretty = JSON.stringify(json, null, 2);
    pelte_util_1.createDir(opts);
    fs_1.writeFileSync(pelte_util_1.changeExtension(opts.srcFile, 'json'), jsonPretty);
    if (!opts.init) {
        fs_1.writeFileSync(path_1.join(opts.outputDir, "package.json"), jsonPretty);
    }
}
exports.createPackageFile = createPackageFile;
function extractPelteOptionsFromJson(pelteOptions) {
    return extractPelteOptionsFromJsonPath(pelte_util_1.changeExtension(pelteOptions.srcFile, 'json'));
}
exports.extractPelteOptionsFromJson = extractPelteOptionsFromJson;
function extractPelteOptionsFromJsonPath(jsonPath) {
    if (!fs_1.existsSync(jsonPath))
        return {};
    let json = JSON.parse(pelte_util_1.readFileUtf8(jsonPath));
    return {
        packageName: json.name,
        packageVersion: json.version,
        componentName: path_1.parse(json.svelte).name,
    };
}
exports.extractPelteOptionsFromJsonPath = extractPelteOptionsFromJsonPath;
//# sourceMappingURL=package-json-creator.js.map