"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pelte = exports.generate = exports.parseOptions = void 0;
const path_1 = require("path");
const rollup_1 = require("rollup");
const rollup_plugin_svelte_1 = __importDefault(require("rollup-plugin-svelte"));
const constants_1 = require("./constants");
const html_creator_1 = require("./creators/html-creator");
const pelte_options_1 = require("./pelte-options");
const package_json_creator_1 = require("./creators/package-json-creator");
const readme_creator_1 = require("./creators/readme-creator");
const clean_up_1 = require("./clean-up");
const npm_publish_1 = require("./npm-publish");
const svelte_copier_1 = require("./svelte-copier");
const ts_config_creator_1 = require("./creators/ts-config-creator");
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
const svelte_preprocess_1 = __importDefault(require("svelte-preprocess"));
// import typescript from '@rollup/plugin-typescript';
function parseOptions(cmdOptions) {
    const opts = pelte_options_1.mergeOptions(cmdOptions);
    const inputOptionsRollup = {
        input: opts.srcFile,
        plugins: [
            rollup_plugin_svelte_1.default({
                customElement: opts.webComponentInfo.exists,
                preprocess: svelte_preprocess_1.default(),
            }),
            plugin_node_resolve_1.default({
                browser: true,
                dedupe: ['svelte']
            }),
            plugin_commonjs_1.default(),
        ]
    };
    const rollupWriteOpts = [
        { format: 'umd', name: opts.componentName, file: path_1.join(opts.outputDir, constants_1.INDEX_UMD), sourcemap: false },
        { format: 'es', file: path_1.join(opts.outputDir, constants_1.INDEX_ES), sourcemap: false }
    ];
    return {
        opts,
        inputOptionsRollup,
        rollupWriteOpts
    };
}
exports.parseOptions = parseOptions;
function generate(cmdOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const { inputOptionsRollup, rollupWriteOpts } = parseOptions(cmdOptions);
        const bundle = yield rollup_1.rollup(inputOptionsRollup);
        return Promise.all(rollupWriteOpts.map((writeOpts) => __awaiter(this, void 0, void 0, function* () {
            return ({
                options: writeOpts,
                bundle: yield bundle.generate(writeOpts)
            });
        })));
    });
}
exports.generate = generate;
function pelte(cmdOptions) {
    const { opts, inputOptionsRollup, rollupWriteOpts } = parseOptions(cmdOptions);
    ts_config_creator_1.createTsConfig(opts);
    package_json_creator_1.createPackageFile(opts);
    readme_creator_1.createReadmeFiles(opts);
    if (opts.init) {
        return;
    }
    return rollup_1.rollup(inputOptionsRollup)
        .then(bundle => {
        opts.watchFiles = bundle.watchFiles;
        return Promise.all(rollupWriteOpts.map(output => bundle.write(output)));
    })
        .then(() => html_creator_1.createHtmlExamples(opts, rollupWriteOpts))
        .then(() => svelte_copier_1.copySvelteFiles(opts))
        .then(() => npm_publish_1.publish(opts))
        .then(() => clean_up_1.cleanUp(opts));
}
exports.pelte = pelte;
//# sourceMappingURL=pelte.js.map