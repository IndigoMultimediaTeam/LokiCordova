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
 * Třída rozšiřující `Loki` o {@link db_utils} a unifikované zavádění.
 * @private
 * @extends loki
 */
class LokiWithUtils extends LokiJS{
    /**
     * Interně inicializuje {@link loki}
     * @param {string} file Jméno souboru pro `loki`
     * @param {types.loki_option} params Parametry pro `loki`
     */
    constructor(file, params){
        super(file, params);
        if(this.utils) throw new Error("LokiWithUtils is not supported with current version of LokiJS!!!");
        /**
         * @property {object} utils Viz jmenný prostor {@link db_utils}.
         */
        this.utils= loki_utils;
    }
    /**
     * Uložení {@link types.DATABAZE} (u nás typicky )
     * @returns {Promise} Viz {@link db_utils.save_}
     * @example <caption>Pokud `tb` a `db` dle funkce `database_`</caption>
     * db.save()_.then(console.log).catch(console.error);
     */
    save_(){
        return this.utils.save_(this);
    }
    /**
     * Zavedení databáze
     * @param {string} file Jméno souboru pro `loki`
     * @param {object} params Parametry pro `loki`
     * @returns {Promise}
     * @.then {LokiWithUtils} `db` Instance `loki`, tj. konkrétní databáze.
     * @.catch {Error}
     */
    static create_(file, params){
        var db;
        return new Promise((resolve, reject)=> {
            params.autoloadCallback= ()=> resolve(db);
            try {
                db= new this(file, params);
            } catch (e){
                reject(e);
            }
        });
    }
}
/**
 * Veřejná funkce pro inicializaci databáze pro {@link LokiWithUtils}.
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
 * @.then {object} {db: {@link types.DATABAZE}, tb: {@link types.TABULKA}[]}
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
    return LokiWithUtils.create_(file, params)
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
        return { db, tb };
    });
}