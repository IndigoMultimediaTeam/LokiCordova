/**
 * Typy v rámci [Loki](http://techfort.github.io/LokiJS) databáze a nebo v rámci této knihovny.
 * @namespace types
 */
/**
 * Instance `loki` (resp. {@link LokiWithUtils}), viz [JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html).
 * @typedef {Object} DATABAZE
 * @memberof types
 */
/**
 * Instance `Collection`, viz [JSDoc: Class: Collection](http://techfort.github.io/LokiJS/Collection.html).
 * @typedef {Object} TABULKA
 * @memberof types
 */
/**
 * Záznam z {@link types.TABULKA}, viz [JSDoc: Class: Resultset](http://techfort.github.io/LokiJS/Resultset.html).
 * @typedef {Object} RADEK
 * @memberof types
 */
/**
 * Data ve formátu pro uložení do {@link types.TABULKA}. Jedná se o **obyčejný objekt**, který si loki převede na {@link types.RADEK}.
 * 
 * Nedoporučuje se, aby dědil informace z {@link types.RADEK} (PS: objekty se předávají **referencí!!!**).
 * @typedef {Object} DATA
 * @memberof types
 * @example <caption>očekávané</caption>
 * const data_1= { name: "Jan", surname: "Andrle" };
 * const data_2= Object.assign(Object.create(null), data_1);
 * const radek: types.RADEK; / * vystup například z *.findOne * /
 * const data_3= { name: radek.name, surname: radek.surname };
 * @example <caption>**neočekávané**</caption>
 * const radek: types.RADEK; / * vystup například z *.findOne * /
 * const data_1= radek;
 * const data_2= { $loki: 1 };
 * const data_3= { meta: { / * … * / } };
 * const data_4= { $loki: 5, meta: { / * … * / } };
 */
/**
 * Dotaz na {@link types.RADEK} (jeden, či více), viz [JSDoc: Tutorial: Query Examples](http://techfort.github.io/LokiJS/tutorial-Query%20Examples.html).
 * 
 * *Tyto dotazy jsou výhodnější na použití než `*.where`, protože jsou optimalizované (případně optimalizovatlené) – viz [JSDoc: Tutorial: Indexing and Query performance](http://techfort.github.io/LokiJS/tutorial-Indexing%20and%20Query%20performance.html)!*
 * @typedef {object} DOTAZ
 * @memberof types
 * @example <caption>Vyhledání uživatele/ů obsahující ve jméně 'Jan' a jejichž věk je >=28</caption>
 * const dotaz= { $and: [ { name: { $contains: "Jan" } }, { age: { $gte: 28 } } ] };
 */
/**
 * Předpřipravené sekvence úkonů pro databázi LokiJS (viz [JSDoc: Tutorial: Collection Transforms](http://techfort.github.io/LokiJS/tutorial-Collection%20Transforms.html)).
 * 
 * Lze používat:
 * - [`*.transform(transform: **DB_TRANSFORMS**, parameters: **object**)`](http://techfort.github.io/LokiJS/Resultset.html#transform)
 * - [*.chain(transform: **DB_TRANSFORMS**, parameters: **object**)](http://techfort.github.io/LokiJS/Collection.html#chain)
 * @typedef {Object[]} DB_TRANSFORMACE
 * @memberof types
 */
/**
 * Parametry pro inicializaci [JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html#Loki).
 * @typedef {object} loki_options
 * @memberof types
 */