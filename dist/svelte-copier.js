"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copySvelteFiles = exports.findNestedSvelteComponents = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function isSvelteDependency(f, srcComponentFile) {
    const parsed = path_1.parse(f);
    return parsed.ext === '.svelte' && parsed.name !== srcComponentFile;
}
function findNestedSvelteComponents(opts) {
    const srcComponentFile = path_1.parse(opts.srcFile).name;
    if (opts.watchFiles) {
        return opts.watchFiles.filter(f => isSvelteDependency(f, srcComponentFile));
    }
    else {
        return [];
    }
}
exports.findNestedSvelteComponents = findNestedSvelteComponents;
function copySvelteFiles(opts) {
    const targetSvelteFile = path_1.join(opts.outputDir, opts.componentName + '.svelte');
    fs_1.copyFileSync(opts.srcFile, targetSvelteFile);
    const srcDir = path_1.parse(opts.srcFile).dir;
    const nestedSvelteComponents = findNestedSvelteComponents(opts);
    nestedSvelteComponents.forEach(svelteDependency => {
        let parsed = path_1.parse(svelteDependency);
        const relativeDir = path_1.relative(srcDir, parsed.dir);
        if (relativeDir.startsWith('..')) {
            console.error('The component "' + path_1.parse(opts.srcFile).base + '" depends on "' + parsed.base + '". This is not allowed. "' + parsed.base + '" must be located in the same folder or in a child folder. The javascript modules will work, but another svelte project will not be able to use this bundle');
        }
        else {
            fs_1.mkdirSync(path_1.join(opts.outputDir, relativeDir), { recursive: true });
            const target = path_1.join(opts.outputDir, relativeDir, parsed.base);
            fs_1.copyFileSync(svelteDependency, target);
        }
    });
}
exports.copySvelteFiles = copySvelteFiles;
//# sourceMappingURL=svelte-copier.js.map