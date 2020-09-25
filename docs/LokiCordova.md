# LokiCordova – Documentation
[⇠ Go back to GitHub repository](https://github.com/IndigoMultimediaTeam/LokiCordova#readme)
<hr>
<p>Overview</p>
<hr>

<hr>
<p>Content</p>
<hr>

<a name="types"></a>

## ~types : <code>object</code>
**Kind**: inner namespace <a name="types" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L26" title="wrapper.js:26"><small>(defined@26)</small></a>  

* [~types](#types) : <code>object</code>
    * [.DATABAZE](#types.DATABAZE) : <code>Object</code>
    * [.TABULKA](#types.TABULKA) : <code>Object</code>
    * [.RADEK](#types.RADEK) : <code>Object</code>
    * [.DATA](#types.DATA) : <code>Object</code>
    * [.DOTAZ](#types.DOTAZ) : <code>object</code>
    * [.DB_TRANSFORMACE](#types.DB_TRANSFORMACE) : <code>Array.&lt;Object&gt;</code>


* * *

<a name="types.DATABAZE"></a>

### types.DATABAZE : <code>Object</code>
>Instance `loki`, viz [JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.DATABAZE" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L30" title="wrapper.js:30"><small>(defined@30)</small></a>  

* * *

<a name="types.TABULKA"></a>

### types.TABULKA : <code>Object</code>
>Instance `Collection`, viz [JSDoc: Class: Collection](http://techfort.github.io/LokiJS/Collection.html).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.TABULKA" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L35" title="wrapper.js:35"><small>(defined@35)</small></a>  

* * *

<a name="types.RADEK"></a>

### types.RADEK : <code>Object</code>
>Záznam z [TABULKA](#types.TABULKA), viz [JSDoc: Class: Resultset](http://techfort.github.io/LokiJS/Resultset.html).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.RADEK" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L40" title="wrapper.js:40"><small>(defined@40)</small></a>  

* * *

<a name="types.DATA"></a>

### types.DATA : <code>Object</code>
>Data ve formátu pro uložení do [TABULKA](#types.TABULKA). Jedná se o **obyčejný objekt**, který si loki převede na [RADEK](#types.RADEK).

Nedoporučuje se, aby dědil informace z [RADEK](#types.RADEK) (PS: objekty se předávají **referencí!!!**).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.DATA" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L45" title="wrapper.js:45"><small>(defined@45)</small></a>  
**Example** *(očekávané)*  
```js
const data_1= { name: "Jan", surname: "Andrle" };
const data_2= Object.assign(Object.create(null), data_1);
const radek: types.RADEK; / * vystup například z *.findOne * /
const data_3= { name: radek.name, surname: radek.surname };
```
**Example** *(**neočekávané**)*  
```js
const radek: types.RADEK; / * vystup například z *.findOne * /
const data_1= radek;
const data_2= { $loki: 1 };
const data_3= { meta: { / * … * / } };
const data_4= { $loki: 5, meta: { / * … * / } };
```

* * *

<a name="types.DOTAZ"></a>

### types.DOTAZ : <code>object</code>
>Dotaz na [RADEK](#types.RADEK) (jeden, či více), viz [JSDoc: Tutorial: Query Examples](http://techfort.github.io/LokiJS/tutorial-Query%20Examples.html).

*Tyto dotazy jsou výhodnější na použití než `*.where`, protože jsou optimalizované (případně optimalizovatlené) – viz [JSDoc: Tutorial: Indexing and Query performance](http://techfort.github.io/LokiJS/tutorial-Indexing%20and%20Query%20performance.html)!*

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.DOTAZ" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L63" title="wrapper.js:63"><small>(defined@63)</small></a>  
**Example** *(Vyhledání uživatele/ů obsahující ve jméně &#x27;Jan&#x27; a jejichž věk je &gt;&#x3D;28)*  
```js
const dotaz= { $and: [ { name: { $contains: "Jan" } }, { age: { $gte: 28 } } ] };
```

* * *

<a name="types.DB_TRANSFORMACE"></a>

### types.DB\_TRANSFORMACE : <code>Array.&lt;Object&gt;</code>
>Předpřipravené sekvence úkonů pro databázi LokiJS (viz [JSDoc: Tutorial: Collection Transforms](http://techfort.github.io/LokiJS/tutorial-Collection%20Transforms.html)).

Lze používat:
- [`*.transform(transform: **DB_TRANSFORMS**, parameters: **object**)`](http://techfort.github.io/LokiJS/Resultset.html#transform)
- [*.chain(transform: **DB_TRANSFORMS**, parameters: **object**)](http://techfort.github.io/LokiJS/Collection.html#chain)

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.DB_TRANSFORMACE" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L72" title="wrapper.js:72"><small>(defined@72)</small></a>  

* * *

<a name="db_utils"></a>

## ~db\_utils : <code>object</code>
>Jmenný prostor obsahující pomocné utility pro práci s tabulkami/databází

**Kind**: inner namespace <a name="db_utils" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L259" title="wrapper.js:259"><small>(defined@259)</small></a>  

* [~db_utils](#db_utils) : <code>object</code>
    * _static_
        * [.join_full](#db_utils.join_full)
        * [.join_inner](#db_utils.join_inner)
        * [.join_left](#db_utils.join_left)
        * [.join_right](#db_utils.join_right)
        * [.save_(database)](#db_utils.save_) ⇒ <code>Promise</code>
        * [.upsertByQuery(collection, updated_data, query)](#db_utils.upsertByQuery) ⇒ <code>number</code>
        * [.upsertByKey(collection, updated_data, [key])](#db_utils.upsertByKey) ⇒ <code>number</code>
        * [.upsertByUnique(collection, updated_data, [key])](#db_utils.upsertByUnique) ⇒ <code>number</code>
        * [.upsertByCallbacks(collection, updateInsert, find)](#db_utils.upsertByCallbacks) ⇒ <code>function</code>
    * _inner_
        * [~join_step](#db_utils..join_step)


* * *

<a name="db_utils.join_full"></a>

### db_utils.join\_full
>Transformace pro [db](db) zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z pravé/levé tabulky nezávisle na tom, zda jsou prázdné.

Využívá [join_step](#db_utils..join_step)

**Kind**: static constant of [<code>db\_utils</code>](#db_utils) <a name="db_utils.join_full" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L289" title="wrapper.js:289"><small>(defined@289)</small></a>  
**Properties**

| Type |
| --- |
| <code>db\_utils~DB\_TRANSFORMACE</code> | 

**Example**  
```js
tb.table.chain().transform(db_utils.join_full, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
```

* * *

<a name="db_utils.join_inner"></a>

### db_utils.join\_inner
>Transformace pro [db](db) zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z pravé/levé tabulky pouze pokud jsou neprázdné.

Využívá [join_step](#db_utils..join_step)

**Kind**: static constant of [<code>db\_utils</code>](#db_utils) <a name="db_utils.join_inner" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L301" title="wrapper.js:301"><small>(defined@301)</small></a>  
**Properties**

| Type |
| --- |
| <code>db\_utils~DB\_TRANSFORMACE</code> | 

**Example**  
```js
tb.table.chain().transform(db_utils.join_inner, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
```

* * *

<a name="db_utils.join_left"></a>

### db_utils.join\_left
>Transformace pro [db](db) zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z levé tabulky a korespondující záznamy z pravé (pokud existují).

Využívá [join_step](#db_utils..join_step)

**Kind**: static constant of [<code>db\_utils</code>](#db_utils) <a name="db_utils.join_left" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L317" title="wrapper.js:317"><small>(defined@317)</small></a>  
**Properties**

| Type |
| --- |
| <code>db\_utils~DB\_TRANSFORMACE</code> | 

**Example**  
```js
tb.table.chain().transform(db_utils.join_left, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
```

* * *

<a name="db_utils.join_right"></a>

### db_utils.join\_right
>Transformace pro [db](db) zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z pravé tabulky a korespondující záznamy z levé (pokud existují).

Využívá [join_step](#db_utils..join_step)

**Kind**: static constant of [<code>db\_utils</code>](#db_utils) <a name="db_utils.join_right" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L333" title="wrapper.js:333"><small>(defined@333)</small></a>  
**Properties**

| Type |
| --- |
| <code>db\_utils~DB\_TRANSFORMACE</code> | 

**Example**  
```js
tb.table.chain().transform(db_utils.join_right, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
```

* * *

<a name="db_utils.save_"></a>

### db_utils.save\_(database) ⇒ <code>Promise</code>
>Uložení změn v databázi

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.save_" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L348" title="wrapper.js:348"><small>(defined@348)</small></a>  
**.then**: <code>undefined</code> Volá se při úspěchu  
**.catch**: <code>Error</code> Volá se při chybě `Error`  

| Param | Type |
| --- | --- |
| database | [<code>DATABAZE</code>](#types.DATABAZE) | 


* * *

<a name="db_utils.upsertByQuery"></a>

### db_utils.upsertByQuery(collection, updated_data, query) ⇒ <code>number</code>
>Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.upsertByQuery" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L363" title="wrapper.js:363"><small>(defined@363)</small></a>  
**Returns**: <code>number</code> - 0/1 záznam aktualizován/vložen  

| Param | Type | Description |
| --- | --- | --- |
| collection | [<code>TABULKA</code>](#types.TABULKA) | Cílová tabulka |
| updated_data | [<code>DATA</code>](#types.DATA) | Aktualizovaná data (předávaná referencí!) |
| query | [<code>DOTAZ</code>](#types.DOTAZ) | Argument pro [tb.findOne](tb.findOne) |

**Example**  
```js
db.utils.upsertByQuery(tb.tabulka, { age: 28 }, { $and: [ { name: "Jan" }, { surname: "Andrle" } ] });
```

* * *

<a name="db_utils.upsertByKey"></a>

### db_utils.upsertByKey(collection, updated_data, [key]) ⇒ <code>number</code>
>Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.upsertByKey" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L383" title="wrapper.js:383"><small>(defined@383)</small></a>  
**Returns**: <code>number</code> - 0/1 záznam aktualizován/vložen  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | [<code>TABULKA</code>](#types.TABULKA) |  | Cílová tabulka |
| updated_data | [<code>DATA</code>](#types.DATA) |  | Aktualizovaná data (předávaná referencí!) |
| [key] | <code>string</code> | <code>&quot;id&quot;</code> | Jméno obecného klíče, které slouží jako identifikátor pro [tb.findOne](tb.findOne) |

**Example**  
```js
db.utils.upsertByKey(tb.tabulka, { id: 15, age: 28 });
db.utils.upsertByKey(tb.tabulka, { key: 15, age: 28 }, "key");
```

* * *

<a name="db_utils.upsertByUnique"></a>

### db_utils.upsertByUnique(collection, updated_data, [key]) ⇒ <code>number</code>
>Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.upsertByUnique" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L406" title="wrapper.js:406"><small>(defined@406)</small></a>  
**Returns**: <code>number</code> - 0/1 záznam aktualizován/vložen  
**Throws**:

- <code>Error</code> Vyhodí chybu pokud je `key="$loki"` a aktualizovaná data obsahují tuto hodnotu vyplněnou (`{ $loki: 15, … }`) – přičemž není v databázi. Jde totiž o to, že `$loki` se autoinkrementuje! Takže jiná hodnota než již existující (aktualizace záznamu) či prázdná (přidání) nedává smysl.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | [<code>TABULKA</code>](#types.TABULKA) |  | Cílová tabulka |
| updated_data | [<code>DATA</code>](#types.DATA) |  | Aktualizovaná data (předávaná referencí!) |
| [key] | <code>string</code> | <code>&quot;id&quot;</code> | Jméno unikátního klíče, které slouží jako identifikátor pro [`Collection.prototype.by`](http://techfort.github.io/LokiJS/lokijs.js.html#line6608) nebo [`Collection.prototype.get`](http://techfort.github.io/LokiJS/lokijs.js.html#line6109) (tedy "$loki"). |

**Example**  
```js
db.utils.upsertByUnique(tb.tabulka, { $loki: 1, age: 28 });
db.utils.upsertByUnique(tb.tabulka, { age: 28 });

db.utils.upsertByUnique(tb.tabulka, { id: 1, age: 28 }, "id");
```

* * *

<a name="db_utils.upsertByCallbacks"></a>

### db_utils.upsertByCallbacks(collection, updateInsert, find) ⇒ <code>function</code>
>**WIP**

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.upsertByCallbacks" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L427" title="wrapper.js:427"><small>(defined@427)</small></a>  

| Param | Type |
| --- | --- |
| collection | [<code>TABULKA</code>](#types.TABULKA) | 
| updateInsert | <code>function</code> | 
| find | <code>function</code> | 


* * *

<a name="db_utils..join_step"></a>

### db_utils~join\_step
>Krok v [typpes.DB_TRANSFORMACE](typpes.DB_TRANSFORMACE) sloužící k fyzickému sloučení záznamů.

**Kind**: inner constant of [<code>db\_utils</code>](#db_utils) <a name="db_utils..join_step" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin\raw/wrapper.js#L274" title="wrapper.js:274"><small>(defined@274)</small></a>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| [<code>Array.&lt;RADEK&gt;</code>](#types.RADEK) \| [<code>TABULKA</code>](#types.TABULKA) | Odpovídá `joinData` v [eqJoin](http://techfort.github.io/LokiJS/Collection.html#eqJoin) |
| left_key | <code>string</code> | Jméno klíče ke sloučení v levé tabulce |
| right_key | <code>string</code> | Jméno klíče ke sloučení v pravé tabulce |

**Properties**

| Type |
| --- |
| <code>object</code> | 


* * *

