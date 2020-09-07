gulp_place("./_classCallCheck.sub.js", "file_once");/* global _classCallCheck */
gulp_place("./_inherits.sub.js", "file_once");/* global _inherits */

export var FSAdapterError = (function (_Error) {
    function FSAdapterError() {
        _classCallCheck(this, FSAdapterError);
        if (_Error != null) { _Error.apply(this, arguments); }
    }
    _inherits(FSAdapterError, _Error);
    return FSAdapterError;
})(Error);