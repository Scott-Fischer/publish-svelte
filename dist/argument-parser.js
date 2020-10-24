"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArguments = void 0;
const commander = require("commander");
var pjson = require('../package.json');
commander
    .version(pjson.version)
    .option('-k, --keep-bundle', 'Skip clean up of bundle')
    .option('-s, --skip-publish', 'Skip publish of bundle')
    .option('--package-version <type>', 'Set package version. Default from  md file if exists')
    .option('--package-name <type>', 'Set package name. Default from md file if exists')
    .option('-n, --component-name <type>', 'Component name. Default name of svelte file')
    .option('-o, --output-dir <type>', 'The output directory of the compiled component')
    .option('--custom-element', 'Compile as web components. pelte will automatically enable this flag if it sees a svelte:options tag="my-element"')
    .option('--patch', 'increment patch version number. Ex: 1.0.0 -> 1.0.1')
    .option('--minor', 'increment version number. Ex: 1.0.0 -> 1.1.0')
    .option('--major', 'increment version number. Ex: 1.0.0 -> 2.0.0');
function removeUndefined(opts) {
    Object.keys(opts).forEach(key => opts[key] === undefined ? delete opts[key] : '');
    return opts;
}
function parseArguments(processArgv) {
    const parsed = commander.parse(processArgv);
    let opts = removeUndefined(parsed.opts());
    return Object.assign({ srcFile: parsed.args[0] }, opts);
}
exports.parseArguments = parseArguments;
//# sourceMappingURL=argument-parser.js.map