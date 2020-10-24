"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const child_process_1 = require("child_process");
const kleur_1 = require("kleur");
function publish(opts) {
    if (!opts.skipPublish) {
        try {
            const result = child_process_1.execSync('npm publish ' + opts.outputDir, { stdio: 'pipe', encoding: 'utf8' });
            console.log(kleur_1.green("Successful publish!!!"));
            console.log(kleur_1.green("Package: " + opts.packageName + ":" + opts.packageVersion));
        }
        catch (e) {
            const error = e.stderr;
            if (error.includes('You cannot publish over the previously published versions')) {
                console.log(`The version ${opts.packageVersion} is already published, you will need to increment version with "pelte ${opts.componentName}.svelte --patch"`);
            }
            else {
                console.error("Error while publishing to npm. You might not be logged in or the package already exists. " +
                    "You can compile your package without publishing to npm with --skip-publish and --keep-bundle");
            }
        }
    }
}
exports.publish = publish;
//# sourceMappingURL=npm-publish.js.map