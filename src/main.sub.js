/* jshint maxdepth: 3 */
/**
 * [JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html)
 * @class loki
 * @private
 */
import * as LokiJS from "depends:loki";
gulp_place("./types.sub.js", "file_once");
gulp_place("FSAdapter/*.sub.js", "glob_once");/* global FSAdapter */
/**
 * Jmenný prostor obsahující pomocné utility pro práci s tabulkami/databází
 * @namespace db_utils
 * @private
 */
gulp_place('{ "glob": "loki_utils/*.sub.js", "use_strict": false }', "combine");/* global loki_utils */
/**
 * Zavedení databáze
 * @param {string} file Jméno souboru pro `loki`
 * @param {object} params Parametry pro `loki`
 * @returns {Promise}
 * @.then {LokiJS} `db` Instance `loki`, tj. konkrétní databáze.
 * @.catch {Error}
 */
function create_(file, params){
    var db;
    return new Promise((resolve, reject)=> {
        params.autoloadCallback= ()=> resolve(db);
        try {
            db= new LokiJS(file, params);
        } catch (e){
            reject(e);
        }
    });
}
/**
 * Veřejná funkce pro inicializaci databáze pro {@link LokiJS}.
 * @method database_
 * @public
 * @param {object} def
 * @param {object} def.db_file
 * @param {string} [def.db_file.file=db.json] Pro `loki` se jedná o jméno databáze, pro nás i výsledné jméno souboru (viz také `db_file.prefix`).
 * @param {string} [def.db_file.prefix=loki] Prefix pro název souboru
 * @param {types.loki_options} [def.params={autoload:true}]
 * @param {string[]} [def.tables=[]] Jména tabulek (N). Tento seznam se porovná s interním (I) seznamem. Tyto seznamy se porovnají a případně se vytvoří/smažou tabulky (např. tabulky v N, které nejsou v I se smažou v databázi).
 * @param {boolean} [def.auto_cordova_adapter=true] Nastavení/autonačtení ukládání pomocí {@link FSAdapter}.
 * @returns {Promise}
 * @.then {object} {db: {@link types.DATABAZE}, db_utils: {@link db_utils}, tb: {@link types.TABULKA}[]}
 * @.catch {Error}
 */
export function database_({
    db_file: { file= "db.json", prefix= "loki" }= {},
    params= { autoload: true },
    tables= [],
    auto_cordova_adapter= true
}= {}){
    if(auto_cordova_adapter)
        params.adapter= new FSAdapter({ prefix });
    return create_(file, params)
    .then(function(db){
        let tb= {};
        let local_tables= db.listCollections().map(v=>v.name);
        let actual_table= "", command= "", local_tables_index= -1;
        for(let i= 0, i_length= tables.length; i < i_length; i++){
            actual_table= tables[i];
            command= "addCollection";
            if(local_tables.length){
                local_tables_index= local_tables.indexOf(actual_table);
                if(local_tables_index!==-1){
                    local_tables.splice(local_tables_index, 1);
                    command= "getCollection";
                }
            }
            tb[actual_table]= db[command](actual_table);
        }
        for(let i=0, i_length= local_tables.length; i<i_length; i++){ db.removeCollection(local_tables[i]); }
        db.saveDatabase();
        return { db, db_utils: loki_utils, tb };
    });
}