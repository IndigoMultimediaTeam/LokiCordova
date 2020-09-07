gulp_place("../FSAdapterError.sub.js", "file_once");/* global FSAdapterError */
/* parent *//* global instance_methods */
instance_methods._createBlob= {
    // adapted from http://stackoverflow.com/questions/15293694/blob-constructor-browser-compatibility

    value: function _createBlob(data, datatype) {
        var blob;

        try {
            blob = new Blob([data], { type: datatype });
        } catch (err) {
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

            if (err.name === "TypeError" && window.BlobBuilder) {
                var bb = new window.BlobBuilder();
                bb.append(data);
                blob = bb.getBlob(datatype);
            } else if (err.name === "InvalidStateError") {
                // InvalidStateError (tested on FF13 WinXP)
                blob = new Blob([data], { type: datatype });
            } else {
                // We're screwed, blob constructor unsupported entirely
                throw new FSAdapterError("Unable to create blob" + JSON.stringify(err));
            }
        }
        return blob;
    }
};