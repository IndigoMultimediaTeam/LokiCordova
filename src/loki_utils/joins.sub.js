/**
 * Krok v {@link db_utils~DB_TRANSFORMACE} sloužící k fyzickému sloučení záznamů.
 * @property {object}
 * @param {array|Resultset|Collection} data Odpovídá `joinData` v [eqJoin](http://techfort.github.io/LokiJS/Collection.html#eqJoin)
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
 * Transformace pro {@link db} zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z pravé/levé tabulky nezávisle na tom, zda jsou prázdné.
 * 
 * Využívá {@link db_utils~join_step}
 * @property {db_utils~DB_TRANSFORMACE}
 * @memberof db_utils
 * @example
 * tb.table.chain().transform(db_utils.join_full, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
 */
export const join_full= [
    join_step
];
/**
 * Transformace pro {@link db} zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z pravé/levé tabulky pouze pokud jsou neprázdné.
 * 
 * Využívá {@link db_utils~join_step}
 * @property {db_utils~DB_TRANSFORMACE}
 * @memberof db_utils
 * @example
 * tb.table.chain().transform(db_utils.join_inner, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
 */
export const join_inner= [
    join_step,
    {
        type: "where",
        value: ({ left, right })=> Boolean(left)&&Boolean(right)
    }
];
/**
 * Transformace pro {@link db} zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z levé tabulky a korespondující záznamy z pravé (pokud existují).
 * 
 * Využívá {@link db_utils~join_step}
 * @property {db_utils~DB_TRANSFORMACE}
 * @memberof db_utils
 * @example
 * tb.table.chain().transform(db_utils.join_left, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
 */
export const join_left= [
    join_step,
    {
        type: "where",
        value: ({ left })=> Boolean(left)
    }
];
/**
 * Transformace pro {@link db} zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z pravé tabulky a korespondující záznamy z levé (pokud existují).
 * 
 * Využívá {@link db_utils~join_step}
 * @property {db_utils~DB_TRANSFORMACE}
 * @memberof db_utils
 * @example
 * tb.table.chain().transform(db_utils.join_right, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
 */
export const join_right= [
    join_step,
    {
        type: "where",
        value: ({ right })=> Boolean(right)
    }
];