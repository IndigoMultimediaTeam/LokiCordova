/**
 * Uložení změn v databázi
 * @memberof db_utils
 * @param {types.DATABAZE} database
 * @returns {Promise}
 * @.then {undefined} Volá se při úspěchu
 * @.catch {Error} Volá se při chybě `Error`
 */
export function save_(database){
    return new Promise(function(resolve,reject){
        database.saveDatabase(err=> err ? reject(err) : resolve());
    });
}