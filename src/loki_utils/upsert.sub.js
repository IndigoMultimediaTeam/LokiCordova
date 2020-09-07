/**
 * Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.
 * @param {tb~TABLE} collection Cílová tabulka
 * @param {object} query Argument pro {@link tb.findOne}
 * @param {object} updated_data Aktualizovaná data
 */
export function upsert(collection, query, updated_data){
    const row= collection.findOne(query);
    if(row){
        collection.update(Object.assign(row, updated_data));
        return 0;
    }
    collection.insert(updated_data);
    return 1;
}