"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTsConfigPath = exports.createTsConfig = exports.TS_CONFIG_NAME = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const pelte_util_1 = require("../pelte-util");
const TS_CONFIG_FILE = `
{
  "extends": "@tsconfig/svelte/tsconfig.json",

  "include": ["src/**/*"],
  "exclude": ["node_modules/*", "__sapper__/*", "public/*"],
}
`;
exports.TS_CONFIG_NAME = "tsconfig.json";
function createTsConfig(opts) {
    pelte_util_1.createDir(opts);
    if (!opts.init) {
        fs_1.writeFileSync(path_1.join(opts.outputDir, exports.TS_CONFIG_NAME), TS_CONFIG_FILE);
        fs_1.writeFileSync(getTsConfigPath(opts), TS_CONFIG_FILE);
    }
}
exports.createTsConfig = createTsConfig;
function getTsConfigPath(opts) {
    const folderPath = path_1.dirname(opts.srcFile);
    return path_1.join(folderPath, exports.TS_CONFIG_NAME);
}
exports.getTsConfigPath = getTsConfigPath;
//# sourceMappingURL=ts-config-creator.js.map