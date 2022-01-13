// Imports
import ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ from "/Users/lizhikui/Documents/work/other/github/multi-pages-webpack-demo/node_modules/css-loader/dist/runtime/noSourceMaps.js";
import ___CSS_LOADER_API_IMPORT___ from "/Users/lizhikui/Documents/work/other/github/multi-pages-webpack-demo/node_modules/css-loader/dist/runtime/api.js";
import ___CSS_LOADER_GET_URL_IMPORT___ from "/Users/lizhikui/Documents/work/other/github/multi-pages-webpack-demo/node_modules/css-loader/dist/runtime/getUrl.js";
var ___CSS_LOADER_URL_IMPORT_0___ = require("./images/tes.jpg", import.meta.url);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@import \"src/public/css/public\";\n.test-1 {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n", ""]);
// Exports
export default ___CSS_LOADER_EXPORT___;
