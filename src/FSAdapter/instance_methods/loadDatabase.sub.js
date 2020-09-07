gulp_place("../FSAdapterError.sub.js", "file_once");/* global FSAdapterError */
gulp_place("../TAG.sub.js", "file_once");/* global TAG */
gulp_place("utils/debug_log.sub.js", "file_once");/* global debug_log */
/* parent *//* global instance_methods */

instance_methods.loadDatabase= {
    value: function loadDatabase(dbname, callback) {
        debug_log(TAG, "loading database");
        this._getFile(dbname, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (event) {
                    var contents = event.target.result;
                    if (contents.length === 0) {
                        //console.warn(TAG, "couldn't find database");
                        callback(null);
                    } else {
                        callback(contents);
                    }
                };
                reader.readAsText(file);
            }, function (err) {
                debug_log(TAG, "error reading file", err);
                callback(new FSAdapterError("Unable to read file" + err.message));
            });
        }, function (err) {
            debug_log(TAG, "error getting file", err);
            callback(new FSAdapterError("Unable to get file: " + err.message));
        });
    }
};