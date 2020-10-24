"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtmlAsString = exports.createHtmlExamples = exports.HTML_FILE_PREFIX = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const templates_1 = require("./templates");
const readme_utils_1 = require("./readme-utils");
exports.HTML_FILE_PREFIX = 'index-example-';
function createHtmlExamples(opts, outputOptions) {
    // create custom element example
    if (opts.webComponentInfo && opts.webComponentInfo.exists) {
        write(opts, { format: 'ce' });
    }
    return outputOptions.map(outputOption => write(opts, outputOption));
}
exports.createHtmlExamples = createHtmlExamples;
function write(opts, outputOption) {
    const format = outputOption.format;
    const filePath = path_1.join(opts.outputDir, `${exports.HTML_FILE_PREFIX}${format}.html`);
    let html = generateHtmlAsString(opts, format);
    fs_1.writeFileSync(filePath, html);
    return html;
}
function createCeHtmlExample(opts) {
    const importLine = `<script src="./index.js"></script>`;
    const createLine = `<${readme_utils_1.getCeName(opts)} />`;
    return replaceTemplateWith(templates_1.INDEX_CE_HTML, importLine, createLine);
}
function generateHtmlAsString(opts, format) {
    if (format === 'es') {
        return createEsModuleHtmlExample(opts);
    }
    else if (format === 'umd') {
        return createUmdModuleHtmlExample(opts);
    }
    else if (format == 'ce') {
        return createCeHtmlExample(opts);
    }
    else {
        throw Error('Format is not handled correct: ' + format);
    }
}
exports.generateHtmlAsString = generateHtmlAsString;
function createEsModuleHtmlExample(opts) {
    const importLine = `import ${opts.componentName} from './index.mjs'`;
    const createLine = `new ${opts.componentName}({target:document.body})`;
    return replaceTemplateWith(templates_1.INDEX_ES_HTML, importLine, createLine);
}
function replaceTemplateWith(template, importLine, createLine) {
    return template
        .replace('{IMPORT_STATEMENT}', importLine)
        .replace('{NEW_COMPONENT_STATEMENT}', createLine);
}
function createUmdModuleHtmlExample(opts) {
    const importLine = `<script src="./index.js"></script>`;
    const createLine = `new ${opts.componentName}({target:document.body})`;
    return replaceTemplateWith(templates_1.INDEX_UMD_HTML, importLine, createLine);
}
//# sourceMappingURL=html-creator.js.map