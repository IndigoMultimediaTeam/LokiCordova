gulp_place("../FSAdapterError.sub.js", "file_once");/* global FSAdapterError */
gulp_place("../TAG.sub.js", "file_once");/* global TAG */
gulp_place("utils/debug_log.sub.js", "file_once");/* global debug_log */
/* parent *//* global instance_methods */

instance_methods.deleteDatabase= {
    value: function deleteDatabase(dbname, callback) {
        var _this = this;
        debug_log(TAG, "delete database");
        window.resolveLocalFileSystemURL(_this.options.target_location, function (dir) {
            var fileName = _this.options.prefix + "__" + dbname;
            // Very important to have { create: true }
            dir.getFile(fileName, { create: true }, function(fileEntry) {
                fileEntry.remove(function() {
                  callback();
                }, function (err) {
                    debug_log(TAG, "error delete file", err);
                    throw new FSAdapterError("Unable delete file" + JSON.stringify(err));
                });
            }, function (err) {
                debug_log(TAG, "error delete database", err);
                throw new FSAdapterError("Unable delete database" + JSON.stringify(err));
            });
        }, function (err) {
            throw new FSAdapterError("Unable to resolve local file system URL" + JSON.stringify(err));
        });
    }
};