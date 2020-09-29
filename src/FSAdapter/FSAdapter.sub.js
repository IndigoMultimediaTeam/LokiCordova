gulp_place("./_createClass.sub.js", "file_once");/* global _createClass */
gulp_place("./_classCallCheck.sub.js", "file_once");/* global _classCallCheck */
gulp_place("./defaultOptions.sub.js", "file_once");/* global defaultOptions */
gulp_place("utils/Object_assign.sub.js", "file_once");/* global Object_assign */
/**
 * Třída (adaptér) pro ukládání `loki` v cordově do souborů.
 * @class FSAdapter
 * @public
 * @param {types.FSAdapter_options} options 
 */
export function FSAdapter(options) {
    _classCallCheck(this, FSAdapter);
    this.options= Object_assign(defaultOptions(), options);
}
var instance_methods= {};
gulp_place("./instance_methods/*.sub.js", "glob_once");
_createClass(FSAdapter, instance_methods);