"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestions = void 0;
const prompts_1 = __importDefault(require("prompts"));
const pelte_options_1 = require("./pelte-options");
const kleur_1 = require("kleur");
const package_json_creator_1 = require("./creators/package-json-creator");
const pelte_util_1 = require("./pelte-util");
function shouldWeSkipPublishToNpm(questions, cliArguemnts) {
    if (cliArguemnts.skipPublish === undefined) {
        questions.push({
            type: 'text',
            name: 'skipPublish',
            message: 'Skip publish to npm the first time (y/n)?',
            initial: 'y',
            format: (s) => { return s.startsWith('y') || s.startsWith('Y') || s.toLocaleLowerCase() === 'yes'; }
        });
    }
}
function askQuestions(cliArguements) {
    cliArguements = Object.assign(cliArguements, package_json_creator_1.extractPelteOptionsFromJson(cliArguements));
    const defaultOpts = pelte_options_1.parseDefaultOptionsFromFileName(cliArguements.srcFile);
    const questions = [];
    if (!cliArguements.packageName) {
        questions.push({
            type: 'text',
            name: 'packageName',
            message: 'Package Name',
            initial: defaultOpts.packageName
        });
    }
    if (!cliArguements.packageVersion) {
        questions.push({
            type: 'text',
            name: 'packageVersion',
            message: 'Package Version',
            initial: defaultOpts.packageVersion
        });
    }
    if (questions.length > 0) {
        pelte_util_1.sayHello();
        console.log(kleur_1.green('I need a name and a version: '));
        console.log(kleur_1.green('(Press enter if you like my suggestions)'));
        console.log();
        shouldWeSkipPublishToNpm(questions, cliArguements);
    }
    return prompts_1.default(questions).then(answers => Object.assign(cliArguements, answers));
}
exports.askQuestions = askQuestions;
//# sourceMappingURL=questions.js.map