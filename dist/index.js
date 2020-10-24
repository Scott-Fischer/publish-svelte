#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pelte_1 = require("./pelte");
const argument_parser_1 = require("./argument-parser");
const questions_1 = require("./questions");
const kleur_1 = require("kleur");
const pelte_util_1 = require("./pelte-util");
const fs_1 = require("fs");
const pelteOptions = argument_parser_1.parseArguments(process.argv);
if (!pelteOptions.srcFile) {
    pelte_util_1.sayHello();
    console.log(kleur_1.green('Example usage: "pelte MySvelteComponent.svelte" or "pelte --help"'));
}
else {
    if (fs_1.existsSync(pelteOptions.srcFile)) {
        questions_1.askQuestions(pelteOptions).then(opts => pelte_1.pelte(opts));
    }
    else {
        console.log(kleur_1.red(`The file "${pelteOptions.srcFile}" does not exist.`));
    }
}
//# sourceMappingURL=index.js.map