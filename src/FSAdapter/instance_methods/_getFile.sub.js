gulp_place("../FSAdapterError.sub.js", "file_once");/* global FSAdapterError */
/* parent *//* global instance_methods */
instance_methods._getFile= {
    value: function _getFile(name, handleSuccess, handleError) {
        var _this = this;

        window.resolveLocalFileSystemURL(_this.options.target_location, function (dir) {
            var fileName = _this.options.prefix + "__" + name;
            dir.getFile(fileName, { create: true }, handleSuccess, handleError);
        }, function (err) {
            throw new FSAdapterError("Unable to resolve local file system URL" + JSON.stringify(err));
        });
    }
};