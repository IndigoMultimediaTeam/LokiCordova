# LokiCordova – Documentation
[⇠ Go back to GitHub repository](https://github.com/IndigoMultimediaTeam/LokiCordova#readme)
<hr>
<p>Overview</p>
<hr>

## Classes

<dl>
<dt><a href="#loki">loki</a> ℗</dt>
<dd></dd>
<dt><a href="#FSAdapter">FSAdapter</a></dt>
<dd></dd>
<dt><a href="#FSAdapterError">FSAdapterError</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#types">types</a> : <code>object</code></dt>
<dd><p>Typy v rámci <a href="http://techfort.github.io/LokiJS">Loki</a> databáze a nebo v rámci této knihovny.</p>
</dd>
<dt><a href="#db_utils">db_utils</a> : <code>object</code></dt>
<dd><p>Jmenný prostor obsahující pomocné utility pro práci s tabulkami/databází</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#database_">database_(def)</a> ⇒ <code>Promise</code></dt>
<dd><p>Veřejná funkce pro inicializaci databáze pro <a href="#loki">loki</a>.</p>
</dd>
</dl>

<hr>
<p>Content</p>
<hr>

<a name="loki"></a>

## loki ℗
**Kind**: global class <a name="loki" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L25" title="wrapper.js:25"><small>(defined@25)</small></a>  
**Access**: private  

* * *

<a name="new_loki_new"></a>

### new loki()
>[JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html)


* * *

<a name="FSAdapter"></a>

## FSAdapter
**Kind**: global class <a name="FSAdapter" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L125" title="wrapper.js:125"><small>(defined@125)</small></a>  
**Access**: public  

* * *

<a name="new_FSAdapter_new"></a>

### new FSAdapter(options)
>Třída (adaptér) pro ukládání `loki` v cordově do souborů.


| Param | Type |
| --- | --- |
| options | [<code>FSAdapter\_options</code>](#types.FSAdapter_options) | 


* * *

<a name="FSAdapterError"></a>

## FSAdapterError
**Kind**: global class <a name="FSAdapterError" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L148" title="wrapper.js:148"><small>(defined@148)</small></a>  
**Access**: public  

* * *

<a name="types"></a>

## types : <code>object</code>
>Typy v rámci [Loki](http://techfort.github.io/LokiJS) databáze a nebo v rámci této knihovny.

**Kind**: global namespace <a name="types" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L31" title="wrapper.js:31"><small>(defined@31)</small></a>  

* [types](#types) : <code>object</code>
    * [.DATABAZE](#types.DATABAZE) : <code>Object</code>
    * [.TABULKA](#types.TABULKA) : <code>Object</code>
    * [.RADEK](#types.RADEK) : <code>Object</code>
    * [.DATA](#types.DATA) : <code>Object</code>
    * [.DOTAZ](#types.DOTAZ) : <code>object</code>
    * [.DB_TRANSFORMACE](#types.DB_TRANSFORMACE) : <code>Array.&lt;Object&gt;</code>
    * [.loki_options](#types.loki_options) : <code>object</code>
    * [.FSAdapter_options](#types.FSAdapter_options) : <code>object</code>


* * *

<a name="types.DATABAZE"></a>

### types.DATABAZE : <code>Object</code>
>Instance `loki` (resp. [LokiWithUtils](LokiWithUtils)), viz [JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.DATABAZE" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L35" title="wrapper.js:35"><small>(defined@35)</small></a>  

* * *

<a name="types.TABULKA"></a>

### types.TABULKA : <code>Object</code>
>Instance `Collection`, viz [JSDoc: Class: Collection](http://techfort.github.io/LokiJS/Collection.html).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.TABULKA" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L40" title="wrapper.js:40"><small>(defined@40)</small></a>  

* * *

<a name="types.RADEK"></a>

### types.RADEK : <code>Object</code>
>Záznam z [TABULKA](#types.TABULKA), viz [JSDoc: Class: Resultset](http://techfort.github.io/LokiJS/Resultset.html).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.RADEK" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L45" title="wrapper.js:45"><small>(defined@45)</small></a>  

* * *

<a name="types.DATA"></a>

### types.DATA : <code>Object</code>
>Data ve formátu pro uložení do [TABULKA](#types.TABULKA). Jedná se o **obyčejný objekt**, který si loki převede na [RADEK](#types.RADEK).

Nedoporučuje se, aby dědil informace z [RADEK](#types.RADEK) (PS: objekty se předávají **referencí!!!**).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.DATA" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L50" title="wrapper.js:50"><small>(defined@50)</small></a>  
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

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.DOTAZ" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L68" title="wrapper.js:68"><small>(defined@68)</small></a>  
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

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.DB_TRANSFORMACE" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L77" title="wrapper.js:77"><small>(defined@77)</small></a>  

* * *

<a name="types.loki_options"></a>

### types.loki\_options : <code>object</code>
>Parametry pro inicializaci [JSDoc: Class: Loki](http://techfort.github.io/LokiJS/Loki.html#Loki).

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.loki_options" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L86" title="wrapper.js:86"><small>(defined@86)</small></a>  

* * *

<a name="types.FSAdapter_options"></a>

### types.FSAdapter\_options : <code>object</code>
>Parametry pro [FSAdapter](#FSAdapter)

**Kind**: static typedef of [<code>types</code>](#types) <a name="types.FSAdapter_options" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L112" title="wrapper.js:112"><small>(defined@112)</small></a>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [prefix] | <code>string</code> | <code>&quot;loki&quot;</code> | Pro ukládání se používá jméno databáze z `loki` a prefix, definovaný zde. |
| [target_location] | <code>string</code> | <code>&quot;cordova.file.dataDirectory&quot;</code> | Cesta pro uložení databáze |


* * *

<a name="db_utils"></a>

## db\_utils : <code>object</code>
>Jmenný prostor obsahující pomocné utility pro práci s tabulkami/databází

**Kind**: global namespace <a name="db_utils" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L283" title="wrapper.js:283"><small>(defined@283)</small></a>  

* [db_utils](#db_utils) : <code>object</code>
    * _static_
        * [.left_join](#db_utils.left_join)
        * [.left_join_strict](#db_utils.left_join_strict)
        * [.save_(database)](#db_utils.save_) ⇒ <code>Promise</code>
        * [.upsertByQuery(collection, updated_data, query)](#db_utils.upsertByQuery) ⇒ <code>number</code>
        * [.upsertByKey(collection, updated_data, [key])](#db_utils.upsertByKey) ⇒ <code>number</code>
        * [.upsertByUnique(collection, updated_data, [key])](#db_utils.upsertByUnique) ⇒ <code>number</code>
        * [.upsertByCallbacks(collection, updateInsert, find)](#db_utils.upsertByCallbacks) ⇒ <code>function</code>
    * _inner_
        * [~join_step](#db_utils..join_step)


* * *

<a name="db_utils.left_join"></a>

### db_utils.left\_join
>Transformace pro [db](db) zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z hlavní ("levé") tabulky a korespondující záznam z pravé (případně prázdný objekt).

Využívá [join_step](#db_utils..join_step)

**Kind**: static constant of [<code>db\_utils</code>](#db_utils) <a name="db_utils.left_join" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L313" title="wrapper.js:313"><small>(defined@313)</small></a>  
**Properties**

| Type |
| --- |
| [<code>DB\_TRANSFORMACE</code>](#types.DB_TRANSFORMACE) | 

**Example** *(Pokud &#x60;tb&#x60; a &#x60;db&#x60; dle funkce &#x60;database_&#x60;)*  
```js
tb.table.chain().transform(db.utils.left_join, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
```

* * *

<a name="db_utils.left_join_strict"></a>

### db_utils.left\_join\_strict
>Transformace pro [db](db) zjednodušující joinováni v rámci LokiJS. Vrátí výsledky z hlavní ("levé") tabulky a korespondující záznamy z pravé (pokud existují).

Využívá [join_step](#db_utils..join_step)

**Kind**: static constant of [<code>db\_utils</code>](#db_utils) <a name="db_utils.left_join_strict" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L325" title="wrapper.js:325"><small>(defined@325)</small></a>  
**Properties**

| Type |
| --- |
| [<code>DB\_TRANSFORMACE</code>](#types.DB_TRANSFORMACE) | 

**Example** *(Pokud &#x60;tb&#x60; a &#x60;db&#x60; dle funkce &#x60;database_&#x60;)*  
```js
tb.table.chain().transform(db.utils.left_join_strict, { data: tb.another_table.chain(), left_key: "left_key", right_key: "right_key" }).data();
```

* * *

<a name="db_utils.save_"></a>

### db_utils.save\_(database) ⇒ <code>Promise</code>
>Uložení změn v databázi

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.save_" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L340" title="wrapper.js:340"><small>(defined@340)</small></a>  
**.then**: <code>undefined</code> Volá se při úspěchu  
**.catch**: <code>Error</code> Volá se při chybě `Error`  

| Param | Type |
| --- | --- |
| database | [<code>DATABAZE</code>](#types.DATABAZE) | 


* * *

<a name="db_utils.upsertByQuery"></a>

### db_utils.upsertByQuery(collection, updated_data, query) ⇒ <code>number</code>
>Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.upsertByQuery" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L355" title="wrapper.js:355"><small>(defined@355)</small></a>  
**Returns**: <code>number</code> - 0/1 záznam aktualizován/vložen  

| Param | Type | Description |
| --- | --- | --- |
| collection | [<code>TABULKA</code>](#types.TABULKA) | Cílová tabulka |
| updated_data | [<code>DATA</code>](#types.DATA) | Aktualizovaná data (předávaná referencí!) |
| query | [<code>DOTAZ</code>](#types.DOTAZ) | Argument pro [tb.findOne](tb.findOne) |

**Example** *(Pokud &#x60;tb&#x60; a &#x60;db&#x60; dle funkce &#x60;database_&#x60;)*  
```js
db.utils.upsertByQuery(tb.tabulka, { age: 28 }, { $and: [ { name: "Jan" }, { surname: "Andrle" } ] });
```

* * *

<a name="db_utils.upsertByKey"></a>

### db_utils.upsertByKey(collection, updated_data, [key]) ⇒ <code>number</code>
>Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.upsertByKey" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L375" title="wrapper.js:375"><small>(defined@375)</small></a>  
**Returns**: <code>number</code> - 0/1 záznam aktualizován/vložen  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | [<code>TABULKA</code>](#types.TABULKA) |  | Cílová tabulka |
| updated_data | [<code>DATA</code>](#types.DATA) |  | Aktualizovaná data (předávaná referencí!) |
| [key] | <code>string</code> | <code>&quot;id&quot;</code> | Jméno obecného klíče, které slouží vlastně jako identifikátor pro [tb.findOne](tb.findOne) (`{ [key]: updated_data[key] }`) |

**Example** *(Pokud &#x60;tb&#x60; a &#x60;db&#x60; dle funkce &#x60;database_&#x60;)*  
```js
db.utils.upsertByKey(tb.tabulka, { id: 15, age: 28 });
db.utils.upsertByKey(tb.tabulka, { key: 15, age: 28 }, "key");
```

* * *

<a name="db_utils.upsertByUnique"></a>

### db_utils.upsertByUnique(collection, updated_data, [key]) ⇒ <code>number</code>
>Pomocná funkce pro vložení/aktualizování záznamu v tabulce `colection`.

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.upsertByUnique" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L398" title="wrapper.js:398"><small>(defined@398)</small></a>  
**Returns**: <code>number</code> - 0/1 záznam aktualizován/vložen  
**Throws**:

- <code>Error</code> Vyhodí chybu pokud je `key="$loki"` a aktualizovaná data obsahují tuto hodnotu vyplněnou (`{ $loki: 15, … }`) – přičemž není v databázi. Jde totiž o to, že `$loki` se autoinkrementuje! Takže jiná hodnota než již existující (aktualizace záznamu) či prázdná (přidání) nedává smysl.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | [<code>TABULKA</code>](#types.TABULKA) |  | Cílová tabulka |
| updated_data | [<code>DATA</code>](#types.DATA) |  | Aktualizovaná data (předávaná referencí!) |
| [key] | <code>string</code> | <code>&quot;id&quot;</code> | Jméno unikátního klíče, které slouží jako identifikátor pro [`Collection.prototype.by`](http://techfort.github.io/LokiJS/lokijs.js.html#line6608) nebo [`Collection.prototype.get`](http://techfort.github.io/LokiJS/lokijs.js.html#line6109) (tedy "$loki"). |

**Example** *(Pokud &#x60;tb&#x60; a &#x60;db&#x60; dle funkce &#x60;database_&#x60;)*  
```js
db.utils.upsertByUnique(tb.tabulka, { $loki: 1, age: 28 });
db.utils.upsertByUnique(tb.tabulka, { age: 28 });

db.utils.upsertByUnique(tb.tabulka, { id: 1, age: 28 }, "id");
```

* * *

<a name="db_utils.upsertByCallbacks"></a>

### db_utils.upsertByCallbacks(collection, updateInsert, find) ⇒ <code>function</code>
>**WIP**

**Kind**: static method of [<code>db\_utils</code>](#db_utils) <a name="db_utils.upsertByCallbacks" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L419" title="wrapper.js:419"><small>(defined@419)</small></a>  

| Param | Type |
| --- | --- |
| collection | [<code>TABULKA</code>](#types.TABULKA) | 
| updateInsert | <code>function</code> | 
| find | <code>function</code> | 


* * *

<a name="db_utils..join_step"></a>

### db_utils~join\_step
>Krok v [DB_TRANSFORMACE](#types.DB_TRANSFORMACE) sloužící k fyzickému sloučení záznamů. Vždy se jedná o "Left Join" transformované tabulky!

**Kind**: inner constant of [<code>db\_utils</code>](#db_utils) <a name="db_utils..join_step" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L298" title="wrapper.js:298"><small>(defined@298)</small></a>  

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

<a name="database_"></a>

## database\_(def) ⇒ <code>Promise</code>
>Veřejná funkce pro inicializaci databáze pro [loki](#loki).

**Kind**: global function <a name="database_" href="https://github.com/IndigoMultimediaTeam/LokiCordova/blob/master/bin/raw/wrapper.js#L451" title="wrapper.js:451"><small>(defined@451)</small></a>  
**Access**: public  
**.then**: <code>object</code> {db: [DATABAZE](#types.DATABAZE), db_utils: [db_utils](#db_utils), tb: [TABULKA](#types.TABULKA)[]}  
**.catch**: <code>Error</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| def | <code>object</code> |  |  |
| def.db_file | <code>object</code> |  |  |
| [def.db_file.file] | <code>string</code> | <code>&quot;db.json&quot;</code> | Pro `loki` se jedná o jméno databáze, pro nás i výsledné jméno souboru (viz také `db_file.prefix`). |
| [def.db_file.prefix] | <code>string</code> | <code>&quot;loki&quot;</code> | Prefix pro název souboru |
| [def.params] | [<code>loki\_options</code>](#types.loki_options) | <code>{autoload:true}</code> |  |
| [def.tables] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Jména tabulek (N). Tento seznam se porovná s interním (I) seznamem. Tyto seznamy se porovnají a případně se vytvoří/smažou tabulky (např. tabulky v N, které nejsou v I se smažou v databázi). |
| [def.auto_cordova_adapter] | <code>boolean</code> | <code>true</code> | Nastavení/autonačtení ukládání pomocí [FSAdapter](#FSAdapter). |


* * *

