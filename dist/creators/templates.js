"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadmeFromOpts = exports.INDEX_CE_HTML = exports.INDEX_UMD_HTML = exports.INDEX_ES_HTML = void 0;
const readme_utils_1 = require("./readme-utils");
exports.INDEX_ES_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ES Module Example</title>
  </head>
  <body>
    <script type="module">
      {IMPORT_STATEMENT}
      {NEW_COMPONENT_STATEMENT}
    </script>
  </body>
</html>`.trim();
exports.INDEX_UMD_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>UMD Module Example</title>
    {IMPORT_STATEMENT}
  </head>
  <body>
    <script>
      {NEW_COMPONENT_STATEMENT}
    </script>
  </body>
</html>
`.trim();
exports.INDEX_CE_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>UMD Module Example</title>
    {IMPORT_STATEMENT}
  </head>
  <body>
    {NEW_COMPONENT_STATEMENT}
  </body>
</html>
`.trim();
exports.createReadmeFromOpts = (opts) => {
    return `# ${opts.packageName}
${opts.packageName} is a vanilla javascript component which will work in any frontend framework. You can install from npm like this:

\`\`\`text
npm install --save ${opts.packageName}
\`\`\`

#### Usage: Javascript (assumes es module) 
\`\`\`javascript
import ${opts.componentName} from '${opts.packageName}'

let ${readme_utils_1.formatName(opts)} = new ${opts.componentName}({target:document.body${readme_utils_1.getPropsObjectExample(opts)});
${readme_utils_1.getPropAdjustExample(opts)} ${readme_utils_1.getOtherPropsIfAny(opts)}
\`\`\`

The "target" is where the component is created. Here it is added to the html body with "document.body", but it could also be document.getElementById('id-of-html-element'). 

You initialize properties with "props" and you can change the prop values by just assigning the props to new values - this will be updated in the UI. 

#### Usage: Legacy Javascript
Below you can see how to use the component with vanilla js.
\`\`\`html
...
<head>
  ...
  <script src="https://unpkg.com/${opts.packageName}@${opts.packageVersion}/index.js"></script>
</head>
<body>
  <script>
    let ${readme_utils_1.formatName(opts)} = new ${opts.componentName}({target:document.body})
  </script>
</body>
\`\`\`

#### Usage: Web Component (aka. Custom Element)
You can use it as a web component.
\`\`\`html
<head>
  <script src="https://unpkg.com/${opts.packageName}@${opts.packageVersion}/index.js"></script>
</head>
<body>
  <${readme_utils_1.getCeName(opts)} ${readme_utils_1.getCeProp(opts)}/>    
</body>
\`\`\`
${readme_utils_1.existsCe(opts) ? '' : `WARNING: The author of the component needs to add <svelte:options tag="${readme_utils_1.getCeName(opts)}"/>.`}
#### Svelte Component
\`\`\`html
<script>
  import ${opts.componentName} from '${opts.packageName}';
</script>
<${opts.componentName}/>
\`\`\`

#### Pelte
This component was created by [pelte](https://www.npmjs.com/package/publish-svelte) (aka publish-svelte)`;
};
//# sourceMappingURL=templates.js.map