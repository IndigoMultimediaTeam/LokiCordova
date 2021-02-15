/**
 * Typy v rámci [Loki](http://techfort.github.io/LokiJS) databáze a nebo v rámci této knihovny.
 */
declare namespace types {
    /**
     * Instance `loki` (resp. {@link LokiWithUtils}), viz [JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html).
     */
    type DATABAZE = any;
    /**
     * Instance `Collection`, viz [JSDoc: Class: Collection](http://techfort.github.io/LokiJS/Collection.html).
     */
    type TABULKA = any;
    /**
     * Záznam z {@link types.TABULKA}, viz [JSDoc: Class: Resultset](http://techfort.github.io/LokiJS/Resultset.html).
     */
    type RADEK = any;
    /**
     * Data ve formátu pro uložení do {@link types.TABULKA}. Jedná se o **obyčejný objekt**, který si loki převede na {@link types.RADEK}.
     *
     * Nedoporučuje se, aby dědil informace z {@link types.RADEK} (PS: objekty se předávají **referencí!!!**).
     * @example
     * <caption>očekávané</caption>
     * const data_1= { name: "Jan", surname: "Andrle" };
     * const data_2= Object.assign(Object.create(null), data_1);
     * const radek: types.RADEK; / * vystup například z *.findOne * /
     * const data_3= { name: radek.name, surname: radek.surname };
     * @example
     * <caption>**neočekávané**</caption>
     * const radek: types.RADEK; / * vystup například z *.findOne * /
     * const data_1= radek;
     * const data_2= { $loki: 1 };
     * const data_3= { meta: { / * … * / } };
     * const data_4= { $loki: 5, meta: { / * … * / } };
     */
    type DATA = any;
    /**
     * Dotaz na {@link types.RADEK} (jeden, či více), viz [JSDoc: Tutorial: Query Examples](http://techfort.github.io/LokiJS/tutorial-Query%20Examples.html).
     *
     * *Tyto dotazy jsou výhodnější na použití než `*.where`, protože jsou optimalizované (případně optimalizovatlené) – viz [JSDoc: Tutorial: Indexing and Query performance](http://techfort.github.io/LokiJS/tutorial-Indexing%20and%20Query%20performance.html)!*
     * @example
     * <caption>Vyhledání uživatele/ů obsahující ve jméně 'Jan' a jejichž věk je >=28</caption>
     * const dotaz= { $and: [ { name: { $contains: "Jan" } }, { age: { $gte: 28 } } ] };
     */
    type DOTAZ = any;
    /**
     * Předpřipravené sekvence úkonů pro databázi LokiJS (viz [JSDoc: Tutorial: Collection Transforms](http://techfort.github.io/LokiJS/tutorial-Collection%20Transforms.html)).
     *
     * Lze používat:
     * - [`*.transform(transform: **DB_TRANSFORMS**, parameters: **object**)`](http://techfort.github.io/LokiJS/Resultset.html#transform)
     * - [*.chain(transform: **DB_TRANSFORMS**, parameters: **object**)](http://techfort.github.io/LokiJS/Collection.html#chain)
     */
    type DB_TRANSFORMACE = object[];
    /**
     * Parametry pro inicializaci [JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html#Loki).
     */
    type loki_options = any;
    /**
     * Parametry pro {@link FSAdapter}
     * @param [prefix = loki] - Pro ukládání se používá jméno databáze z `loki` a prefix, definovaný zde.
     * @param [target_location = cordova.file.dataDirectory] - Cesta pro uložení databáze
     */
    type FSAdapter_options = any;
}

/**
 * Třída (adaptér) pro ukládání `loki` v cordově do souborů.
 */
declare class FSAdapter {
    constructor(options: types.FSAdapter_options);
}

declare class FSAdapterError {
}

/**
 * Jmenný prostor obsahující pomocné utility pro práci s tabulkami/databází
 */
declare namespace db_utils {
    /**
     * Krok v {@link types.DB_TRANSFORMACE} sloužící k fyzickému sloučení záznamů. Vždy se jedná o "Left Join" transformované tabulky!
     */
    const join_step: {};
    /**
     * Transformace pro {@link db} zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z hlavní ("levé") tabulky a korespondující záznam z pravé (případně prázdný objekt).
     *
     * Využívá {@link db_utils~join_step}
     * @example
     * <caption>Pokud `tb` a `db` dle funkce `database_`</caption>
     * tb.table.chain().transform(db.utils.left_join, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
     */
    const left_join: {};
    /**
     * Transformace pro {@link db} zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z hlavní ("levé") tabulky a korespondující záznamy z pravé (pokud existují).
     *
     * Využívá {@link db_utils~join_step}
     * @example
     * <caption>Pokud `tb` a `db` dle funkce `database_`</caption>
     * tb.table.chain().transform(db.utils.left_join_strict, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
     */
    const left_join_strict: {};
    /**
     * Uložení změn v databázi
     */
    function save_(database: types.DATABAZE): Promise;
    /**
     * Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.
     * @example
     * <caption>Pokud `tb` a `db` dle funkce `database_`</caption>
     * db.utils.upsertByQuery(tb.tabulka, { age: 28 }, { $and: [ { name: "Jan" }, { surname: "Andrle" } ] });
     * @param collection - Cílová tabulka
     * @param updated_data - Aktualizovaná data (předávaná referencí!)
     * @param query - Argument pro {@link tb.findOne}
     * @returns 0/1 záznam aktualizován/vložen
     */
    function upsertByQuery(collection: types.TABULKA, updated_data: types.DATA, query: types.DOTAZ): number;
    /**
     * Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.
     * @example
     * <caption>Pokud `tb` a `db` dle funkce `database_`</caption>
     * db.utils.upsertByKey(tb.tabulka, { id: 15, age: 28 });
     * db.utils.upsertByKey(tb.tabulka, { key: 15, age: 28 }, "key");
     * @param collection - Cílová tabulka
     * @param updated_data - Aktualizovaná data (předávaná referencí!)
     * @param [key = id] - Jméno obecného klíče, které slouží vlastně jako identifikátor pro {@link tb.findOne} (`{ [key]: updated_data[key] }`)
     * @returns 0/1 záznam aktualizován/vložen
     */
    function upsertByKey(collection: types.TABULKA, updated_data: types.DATA, key?: string): number;
    /**
     * Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.
     * @example
     * <caption>Pokud `tb` a `db` dle funkce `database_`</caption>
     * db.utils.upsertByUnique(tb.tabulka, { $loki: 1, age: 28 });
     * db.utils.upsertByUnique(tb.tabulka, { age: 28 });
     *
     * db.utils.upsertByUnique(tb.tabulka, { id: 1, age: 28 }, "id");
     * @param collection - Cílová tabulka
     * @param updated_data - Aktualizovaná data (předávaná referencí!)
     * @param [key = id] - Jméno unikátního klíče, které slouží jako identifikátor pro [`Collection.prototype.by`](http://techfort.github.io/LokiJS/lokijs.js.html#line6608) nebo [`Collection.prototype.get`](http://techfort.github.io/LokiJS/lokijs.js.html#line6109) (tedy "$loki").
     * @returns 0/1 záznam aktualizován/vložen
     */
    function upsertByUnique(collection: types.TABULKA, updated_data: types.DATA, key?: string): number;
    /**
     * **WIP**
     */
    function upsertByCallbacks(collection: types.TABULKA, updateInsert: (...params: any[]) => any, find: (...params: any[]) => any): (...params: any[]) => any;
}

/**
 * Veřejná funkce pro inicializaci databáze pro {@link loki}.
 * @param [def.db_file.file = db.json] - Pro `loki` se jedná o jméno databáze, pro nás i výsledné jméno souboru (viz také `db_file.prefix`).
 * @param [def.db_file.prefix = loki] - Prefix pro název souboru
 * @param [def.tables = []] - Jména tabulek (N). Tento seznam se porovná s interním (I) seznamem. Tyto seznamy se porovnají a případně se vytvoří/smažou tabulky (např. tabulky v N, které nejsou v I se smažou v databázi).
 * @param [def.auto_cordova_adapter = true] - Nastavení/autonačtení ukládání pomocí {@link FSAdapter}.
 */
declare function database_(def: {
    db_file: {
        file?: string;
        prefix?: string;
    };
    params?: types.loki_options;
    tables?: string[];
    auto_cordova_adapter?: boolean;
}): Promise;

const db= new Loki;
const tb= {
    //tabulka: new Collection;
};