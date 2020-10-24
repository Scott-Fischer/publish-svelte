"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = exports.findExportedFields = exports.findVars = exports.findVarsFromFile = exports.findEventEmitters = exports.detectCustomComponent = exports.detectCustomComponentOpts = exports.changeExtension = exports.readFileUtf8 = exports.createDir = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const kleur_1 = require("kleur");
const compiler_1 = require("svelte/compiler");
function createDir(opts) {
    if (!fs_1.existsSync(opts.outputDir)) {
        fs_1.mkdirSync(opts.outputDir);
    }
}
exports.createDir = createDir;
function readFileUtf8(file) {
    return fs_1.readFileSync(file, { encoding: 'utf8' });
}
exports.readFileUtf8 = readFileUtf8;
function changeExtension(srcFile, extention) {
    const parsed = path_1.parse(srcFile);
    return path_1.join(parsed.dir, parsed.name + "." + extention);
}
exports.changeExtension = changeExtension;
function detectCustomComponentOpts(opts) {
    try {
        return detectCustomComponent(readFileUtf8(opts.srcFile));
    }
    catch (e) {
        return { exists: false };
    }
}
exports.detectCustomComponentOpts = detectCustomComponentOpts;
function detectCustomComponent(content) {
    const dispatchRegex = /<svelte:options\s+.*?tag=["'{](.*?)["'}].*?>/g;
    const match = dispatchRegex.exec(content);
    if (match && match.length > 1) {
        const name = match[1];
        return {
            exists: true,
            name: name == 'null' ? null : name,
            requireDefine: name == 'null'
        };
    }
    else {
        return {
            exists: false
        };
    }
}
exports.detectCustomComponent = detectCustomComponent;
function findEventEmitters(content) {
    const eventNames = [];
    const dispatchRegex = /dispatch\s*\(\s*['"]?(.+?)['"]?\s*,/g;
    iterateMatches(dispatchRegex, content, match => eventNames.push(match[1]));
    return eventNames;
}
exports.findEventEmitters = findEventEmitters;
function findVarsFromFile(opts) {
    try {
        return findVars(readFileUtf8(opts.srcFile));
    }
    catch (e) {
        return [];
    }
}
exports.findVarsFromFile = findVarsFromFile;
function findVars(content) {
    return compiler_1.compile(content).vars.filter(v => v.module == false && v.export_name).map(v => v.export_name);
}
exports.findVars = findVars;
function findExportedFields(content) {
    const fields = [];
    //                        export   let    name   =     " value  "       ;
    const regexFieldDefault = /export\s+(let|const)\s+(\w+)\s*=\s*['"]?(.*?)['"]?\s*;/g;
    iterateMatches(regexFieldDefault, content, m => fields.push({ name: m[2], defaultValue: m[3] }));
    //                      export      let         name        ;
    const regexFieldNoDefault = /export\s+(let|const)\s+(\w+)\s*;/g;
    iterateMatches(regexFieldNoDefault, content, m => fields.push({ name: m[2], defaultValue: m[3] }));
    return fields;
}
exports.findExportedFields = findExportedFields;
function iterateMatches(regex, content, callback) {
    let match = regex.exec(content);
    while (match != null) {
        callback(match);
        match = regex.exec(content);
    }
}
function sayHello() {
    console.log(kleur_1.green('Hello!!!'));
    console.log(kleur_1.green('My name is Pelte and I will help you share svelte component with the world.'));
}
exports.sayHello = sayHello;
//# sourceMappingURL=pelte-util.js.map