/**
 * Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.
 * @memberof db_utils
 * @param {types.TABULKA} collection Cílová tabulka
 * @param {types.DATA} updated_data Aktualizovaná data (předávaná referencí!)
 * @param {types.DOTAZ} query Argument pro {@link tb.findOne}
 * @returns {number} 0/1 záznam aktualizován/vložen
 * @example
 * db.utils.upsertByQuery(tb.tabulka, { age: 28 }, { $and: [ { name: "Jan" }, { surname: "Andrle" } ] });
 */
export function upsertByQuery(collection, updated_data, query){
    const row= collection.findOne(query);
    if(row){
        collection.update(Object.assign(row, updated_data));
        return 0;
    }
    collection.insert(updated_data);
    return 1;
}
/**
 * Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.
 * @memberof db_utils
 * @param {types.TABULKA} collection Cílová tabulka
 * @param {types.DATA} updated_data Aktualizovaná data (předávaná referencí!)
 * @param {string} [key=id] Jméno obecného klíče, které slouží vlastně jako identifikátor pro {@link tb.findOne} (`{ [key]: updated_data[key] }`)
 * @returns {number} 0/1 záznam aktualizován/vložen
 * @example
 * db.utils.upsertByKey(tb.tabulka, { id: 15, age: 28 });
 * db.utils.upsertByKey(tb.tabulka, { key: 15, age: 28 }, "key");
 */
export function upsertByKey(collection, updated_data, key= "id"){
    const row= collection.findOne({ [key]: updated_data[key] });
    if(row){
        collection.update(Object.assign(row, updated_data));
        return 0;
    }
    collection.insert(updated_data);
    return 1;
}
/**
 * Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.
 * @memberof db_utils
 * @param {types.TABULKA} collection Cílová tabulka
 * @param {types.DATA} updated_data Aktualizovaná data (předávaná referencí!)
 * @param {string} [key=id] Jméno unikátního klíče, které slouží jako identifikátor pro [`Collection.prototype.by`](http://techfort.github.io/LokiJS/lokijs.js.html#line6608) nebo [`Collection.prototype.get`](http://techfort.github.io/LokiJS/lokijs.js.html#line6109) (tedy "$loki").
 * @returns {number} 0/1 záznam aktualizován/vložen
 * @throws {Error} Vyhodí chybu pokud je `key="$loki"` a aktualizovaná data obsahují tuto hodnotu vyplněnou (`{ $loki: 15, … }`) – přičemž není v databázi. Jde totiž o to, že `$loki` se autoinkrementuje! Takže jiná hodnota než již existující (aktualizace záznamu) či prázdná (přidání) nedává smysl.
 * @example
 * db.utils.upsertByUnique(tb.tabulka, { $loki: 1, age: 28 });
 * db.utils.upsertByUnique(tb.tabulka, { age: 28 });
 * 
 * db.utils.upsertByUnique(tb.tabulka, { id: 1, age: 28 }, "id");
 */
export function upsertByUnique(collection, updated_data, key= "id"){
    const value= updated_data[key];
    const is_$loki= key==="$loki", is_filled= typeof value!=="undefined";
    const row= !is_$loki ? collection.by(key, value) : ( is_filled ? collection.get(value) : null);
    if(row){
        collection.update(Object.assign(row, updated_data));
        return 0;
    }
    if(is_$loki&&is_filled)
        throw new Error("Klíči `$loki` nelze nastavit jakoukoliv hodnotu! Tato funkce tedy akceptuje pouze vyplnění existujícím záznamem, či nevyplněno (=přidání nového záznamu).");
    collection.insert(updated_data);
    return 1;
}
/**
 * **WIP**
 * @memberof db_utils
 * @param {types.TABULKA} collection
 * @param {function} updateInsert
 * @param {function} find
 * @returns {function}
 */
export function upsertByCallbacks(collection, updateInsert, find= (c, { id })=> c.findOne({ id })){
    return function(updated_data){
        const row= find(collection, updated_data);
        if(row){
            collection.update(updateInsert(row, updated_data));
            return 0;
        }
        collection.insert(updateInsert(row, updated_data));
        return 1;
    };
}