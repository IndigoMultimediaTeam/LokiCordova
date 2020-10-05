/**
 * Krok v {@link types.DB_TRANSFORMACE} sloužící k fyzickému sloučení záznamů. Vždy se jedná o "Left Join" transformované tabulky!
 * @property {object}
 * @param {object[]|types.RADEK[]|types.TABULKA} data Odpovídá `joinData` v [eqJoin](http://techfort.github.io/LokiJS/Collection.html#eqJoin)
 * @param {string} left_key Jméno klíče ke sloučení v levé tabulce
 * @param {string} right_key Jméno klíče ke sloučení v pravé tabulce
 * @memberof db_utils
 * @inner
 */
const join_step= {
    type: 'eqJoin',
    joinData: "[%lktxp]data",
    leftJoinKey: "[%lktxp]left_key",
    rightJoinKey: "[%lktxp]right_key",
};
/**
 * Transformace pro {@link db} zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z hlavní ("levé") tabulky a korespondující záznam z pravé (případně prázdný objekt).
 * 
 * Využívá {@link db_utils~join_step}
 * @property {types.DB_TRANSFORMACE}
 * @memberof db_utils
 * @example <caption>Pokud `tb` a `db` dle funkce `database_`</caption>
 * tb.table.chain().transform(db.utils.left_join, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
 */
export const left_join= [
    join_step
];
/**
 * Transformace pro {@link db} zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z hlavní ("levé") tabulky a korespondující záznamy z pravé (pokud existují).
 * 
 * Využívá {@link db_utils~join_step}
 * @property {types.DB_TRANSFORMACE}
 * @memberof db_utils
 * @example <caption>Pokud `tb` a `db` dle funkce `database_`</caption>
 * tb.table.chain().transform(db.utils.left_join_strict, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
 */
export const left_join_strict= [
    join_step,
    {
        type: "where",
        value: ({ right })=> right&&typeof right.$loki!== "undefined"
    }
];