"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDefaultOptionsFromFileName = exports.incrementVersion = exports.mergeOptions = exports.DEFAULT_INIT_VERSION = void 0;
const path_1 = require("path");
const package_json_creator_1 = require("./creators/package-json-creator");
const pelte_util_1 = require("./pelte-util");
exports.DEFAULT_INIT_VERSION = '0.0.1';
function mergeOptions(cliArguments) {
    const defaultOpts = parseDefaultOptionsFromFileName(cliArguments.srcFile);
    const mdOpts = package_json_creator_1.extractPelteOptionsFromJson(cliArguments);
    mdOpts.webComponentInfo = pelte_util_1.detectCustomComponentOpts(cliArguments);
    mdOpts.componentProps = pelte_util_1.findVarsFromFile(cliArguments);
    return Object.assign(Object.assign(Object.assign({}, defaultOpts), mdOpts), cliArguments);
}
exports.mergeOptions = mergeOptions;
function incrementVersion(opts) {
    if (opts.patch || opts.minor || opts.major) {
        const versions = opts.packageVersion.split(".");
        let patch = opts.patch ? parseInt(versions[0]) + 1 : versions[0];
        let minor = opts.minor ? parseInt(versions[1]) + 1 : versions[1];
        let major = opts.major ? parseInt(versions[2]) + 1 : versions[2];
        opts.packageVersion = `${major}.${minor}.${patch}`;
    }
    return opts;
}
exports.incrementVersion = incrementVersion;
function parseDefaultOptionsFromFileName(srcFile) {
    let parsed = path_1.parse(srcFile);
    return {
        srcFile: srcFile,
        keepBundle: false,
        skipPublish: false,
        outputDir: path_1.join(parsed.dir, parsed.name),
        componentName: parsed.name,
        packageName: 'pelte-' + toKebabCase(parsed.name),
        packageVersion: exports.DEFAULT_INIT_VERSION
    };
}
exports.parseDefaultOptionsFromFileName = parseDefaultOptionsFromFileName;
function toKebabCase(camelCase) {
    return camelCase.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
//# sourceMappingURL=pelte-options.js.map