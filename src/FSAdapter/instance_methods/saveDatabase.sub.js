gulp_place("../FSAdapterError.sub.js", "file_once");/* global FSAdapterError */
gulp_place("../TAG.sub.js", "file_once");/* global TAG */
gulp_place("utils/debug_log.sub.js", "file_once");/* global debug_log */
/* parent *//* global instance_methods */

instance_methods.saveDatabase= {
    value: function saveDatabase(dbname, dbstring, callback) {
        var _this = this;

        debug_log(TAG, "saving database");
        this._getFile(dbname, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function () {
                    if (fileWriter.length === 0) {
                        var blob = _this._createBlob(dbstring, "text/plain");
                        fileWriter.write(blob);
                        callback();
                    }
                };
                fileWriter.truncate(0);
            }, function (err) {
                debug_log(TAG, "error writing file", err);
                throw new FSAdapterError("Unable to write file" + JSON.stringify(err));
            });
        }, function (err) {
            debug_log(TAG, "error getting file", err);
            throw new FSAdapterError("Unable to get file" + JSON.stringify(err));
        });
    }
};