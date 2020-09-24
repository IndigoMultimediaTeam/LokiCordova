/* jshint maxdepth: 3 */
import * as LokiJS from "depends:loki";
gulp_place("FSAdapter/*.sub.js", "glob_once");/* global FSAdapter */
gulp_place('{ "glob": "loki_utils/*.sub.js", "use_strict": false }', "combine");/* global loki_utils */

class LokiWithUtils extends LokiJS{
    constructor(file, params){
        super(file, params);
        if(this.utils) throw new Error("LokiWithUtils is not supported with current version of LokiJS!!!");
        this.utils= loki_utils;
    }
    save_(){
        return this.utils.save_(this);
    }
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