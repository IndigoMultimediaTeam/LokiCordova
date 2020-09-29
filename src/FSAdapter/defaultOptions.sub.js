/* cordova *//* global cordova *///gulp.keep.line

function defaultOptions(){
    /**
     * Parametry pro {@link FSAdapter}
     * @memberof types
     * @typedef {object} FSAdapter_options
     * @param {string} [prefix=loki] Pro ukládání se používá jméno databáze z `loki` a prefix, definovaný zde.
     * @param {string} [target_location=cordova.file.dataDirectory] Cesta pro uložení databáze
     */
    return {
        prefix: "loki",
        target_location: cordova.file.dataDirectory
    };
}