
export function save_(database){
    return new Promise(function(resolve,reject){
        database.saveDatabase(err=> err ? reject(err) : resolve());
    });
}