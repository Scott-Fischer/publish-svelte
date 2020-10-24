"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCeProp = exports.getCeName = exports.existsCe = exports.getOtherPropsIfAny = exports.getPropAdjustExample = exports.getPropsObjectExample = exports.formatName = void 0;
exports.formatName = (opts) => {
    return opts.componentName.charAt(0).toLocaleLowerCase() + opts.componentName.substring(1);
};
function existsProp(opts) {
    return opts.componentProps && opts.componentProps.length > 0;
}
function getPropsObjectExample(opts) {
    return existsProp(opts) ? `, props: { ${opts.componentProps[0]}: 'Init Value' }` : '';
}
exports.getPropsObjectExample = getPropsObjectExample;
function getPropAdjustExample(opts) {
    return existsProp(opts) ? `${exports.formatName(opts)}.${opts.componentProps[0]} = 'Updated Value';` : '';
}
exports.getPropAdjustExample = getPropAdjustExample;
function getOtherPropsIfAny(opts) {
    return existsProp(opts) && opts.componentProps.length > 1 ? `\n// Other props: ${opts.componentProps.slice(1).join(', ')}` : '';
}
exports.getOtherPropsIfAny = getOtherPropsIfAny;
function existsCe(opts) {
    return (opts.webComponentInfo && opts.webComponentInfo.exists);
}
exports.existsCe = existsCe;
function getCeName(opts) {
    return existsCe(opts) ? opts.webComponentInfo.name : 'name-of-ce';
}
exports.getCeName = getCeName;
function getCeProp(opts) {
    return existsProp(opts) ? opts.componentProps[0] + '="Init Value" ' : ' ';
}
exports.getCeProp = getCeProp;
//# sourceMappingURL=readme-utils.js.map