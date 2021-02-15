/**
 * LokiEventEmitter is a minimalist version of EventEmitter. It enables any
 * constructor that inherits EventEmitter to emit events and trigger
 * listeners that have been added to the event through the on(event, callback) method
 */
declare class LokiEventEmitter {
    /**
     * @property events - a hashmap, with each property being an array of callbacks
     */
    events: {
        events: hashmap;
    };
    /**
     * @property asyncListeners - boolean determines whether or not the callbacks associated with each event
     * should happen in an async fashion or not
     * Default is false, which means events are synchronous
     */
    asyncListeners: {
        asyncListeners: boolean;
    };
    /**
     * on(eventName, listener) - adds a listener to the queue of callbacks associated to an event
     * @param eventName - the name(s) of the event(s) to listen to
     * @param listener - callback function of listener to attach
     * @returns the index of the callback in the array of listeners for a particular event
     */
    on(eventName: string | string[], listener: (...params: any[]) => any): int;
    /**
     * emit(eventName, data) - emits a particular event
     * with the option of passing optional parameters which are going to be processed by the callback
     * provided signatures match (i.e. if passing emit(event, arg0, arg1) the listener should take two parameters)
     * @param eventName - the name of the event
     * @param [data] - optional object passed with the event
     */
    emit(eventName: string, data?: any): void;
    /**
     * Alias of LokiEventEmitter.prototype.on
     * addListener(eventName, listener) - adds a listener to the queue of callbacks associated to an event
     */
    addListener: any;
    /**
     * removeListener() - removes the listener at position 'index' from the event 'eventName'
     * @param eventName - the name(s) of the event(s) which the listener is attached to
     * @param listener - the listener callback function to remove from emitter
     */
    removeListener(eventName: string | string[], listener: (...params: any[]) => any): void;
}

declare interface Loki extends LokiEventEmitter {
}

/**
 * Loki: The main database class
 * @param filename - name of the file to be saved to
 * @param [options] - (Optional) config options object
 * @param options.env - override environment detection as 'NODEJS', 'BROWSER', 'CORDOVA'
 * @param [options.verbose = false] - enable console output
 * @param [options.autosave = false] - enables autosave
 * @param [options.autosaveInterval = 5000] - time interval (in milliseconds) between saves (if dirty)
 * @param [options.autoload = false] - enables autoload on loki instantiation
 * @param options.autoloadCallback - user callback called after database load
 * @param options.adapter - an instance of a loki persistence adapter
 * @param [options.serializationMethod = 'normal'] - ['normal', 'pretty', 'destructured']
 * @param options.destructureDelimiter - string delimiter used for destructured serialization
 * @param [options.throttledSaves = true] - debounces multiple calls to to saveDatabase reducing number of disk I/O operations
 *                                                 and guaranteeing proper serialization of the calls.
 */
declare class Loki implements LokiEventEmitter {
    constructor(filename: string, options?: {
        env: string;
        verbose?: boolean;
        autosave?: boolean;
        autosaveInterval?: int;
        autoload?: boolean;
        autoloadCallback: (...params: any[]) => any;
        adapter: adapter;
        serializationMethod?: string;
        destructureDelimiter: string;
        throttledSaves?: boolean;
    });
    /**
     * Allows reconfiguring database options
     * @param options - configuration options to apply to loki db object
     * @param options.env - override environment detection as 'NODEJS', 'BROWSER', 'CORDOVA'
     * @param options.verbose - enable console output (default is 'false')
     * @param options.autosave - enables autosave
     * @param options.autosaveInterval - time interval (in milliseconds) between saves (if dirty)
     * @param options.autoload - enables autoload on loki instantiation
     * @param options.autoloadCallback - user callback called after database load
     * @param options.adapter - an instance of a loki persistence adapter
     * @param options.serializationMethod - ['normal', 'pretty', 'destructured']
     * @param options.destructureDelimiter - string delimiter used for destructured serialization
     * @param initialConfig - (internal) true is passed when loki ctor is invoking
     */
    configureOptions(options: {
        env: string;
        verbose: boolean;
        autosave: boolean;
        autosaveInterval: int;
        autoload: boolean;
        autoloadCallback: (...params: any[]) => any;
        adapter: adapter;
        serializationMethod: string;
        destructureDelimiter: string;
    }, initialConfig: boolean): void;
    /**
     * Copies 'this' database into a new Loki instance. Object references are shared to make lightweight.
     * @param options - apply or override collection level settings
     * @param options.removeNonSerializable - nulls properties not safe for serialization.
     */
    copy(options: {
        removeNonSerializable: boolean;
    }): void;
    /**
     * Adds a collection to the database.
     * @param name - name of collection to add
     * @param [options] - (optional) options to configure collection with.
     * @param [options.unique = []] - array of property names to define unique constraints for
     * @param [options.exact = []] - array of property names to define exact constraints for
     * @param [options.indices = []] - array property names to define binary indexes for
     * @param [options.asyncListeners = false] - whether listeners are called asynchronously
     * @param [options.disableMeta = false] - set to true to disable meta property on documents
     * @param [options.disableChangesApi = true] - set to false to enable Changes Api
     * @param [options.disableDeltaChangesApi = true] - set to false to enable Delta Changes API (requires Changes API, forces cloning)
     * @param [options.autoupdate = false] - use Object.observe to update objects automatically
     * @param [options.clone = false] - specify whether inserts and queries clone to/from user
     * @param [options.cloneMethod = 'parse-stringify'] - 'parse-stringify', 'jquery-extend-deep', 'shallow, 'shallow-assign'
     * @param [options.ttl] - age of document (in ms.) before document is considered aged/stale.
     * @param [options.ttlInterval] - time interval for clearing out 'aged' documents; not set by default.
     * @returns a reference to the collection which was just added
     */
    addCollection(name: string, options?: {
        unique?: any[];
        exact?: any[];
        indices?: any[];
        asyncListeners?: boolean;
        disableMeta?: boolean;
        disableChangesApi?: boolean;
        disableDeltaChangesApi?: boolean;
        autoupdate?: boolean;
        clone?: boolean;
        cloneMethod?: string;
        ttl?: int;
        ttlInterval?: int;
    }): Collection;
    /**
     * Retrieves reference to a collection by name.
     * @param collectionName - name of collection to look up
     * @returns Reference to collection in database by that name, or null if not found
     */
    getCollection(collectionName: string): Collection;
    /**
     * Renames an existing loki collection
     * @param oldName - name of collection to rename
     * @param newName - new name of collection
     * @returns reference to the newly renamed collection
     */
    renameCollection(oldName: string, newName: string): Collection;
    /**
     * Returns a list of collections in the database.
     * @returns array of objects containing 'name', 'type', and 'count' properties.
     */
    listCollections(): object[];
    /**
     * Removes a collection from the database.
     * @param collectionName - name of collection to remove
     */
    removeCollection(collectionName: string): void;
    /**
     * Serialize database to a string which can be loaded via {@link Loki#loadJSON}
     * @returns Stringified representation of the loki database.
     */
    serialize(): string;
    /**
     * Database level destructured JSON serialization routine to allow alternate serialization methods.
     * Internally, Loki supports destructuring via loki "serializationMethod' option and
     * the optional LokiPartitioningAdapter class. It is also available if you wish to do
     * your own structured persistence or data exchange.
     * @param [options] - output format options for use externally to loki
     * @param [options.partitioned] - (default: false) whether db and each collection are separate
     * @param [options.partition] - can be used to only output an individual collection or db (-1)
     * @param [options.delimited] - (default: true) whether subitems are delimited or subarrays
     * @param [options.delimiter] - override default delimiter
     * @returns A custom, restructured aggregation of independent serializations.
     */
    serializeDestructured(options?: {
        partitioned?: boolean;
        partition?: int;
        delimited?: boolean;
        delimiter?: string;
    }): string | any[];
    /**
     * Collection level utility method to serialize a collection in a 'destructured' format
     * @param [options] - used to determine output of method
     * @param options.delimited - whether to return single delimited string or an array
     * @param options.delimiter - (optional) if delimited, this is delimiter to use
     * @param options.collectionIndex - specify which collection to serialize data for
     * @returns A custom, restructured aggregation of independent serializations for a single collection.
     */
    serializeCollection(options?: {
        delimited: int;
        delimiter: string;
        collectionIndex: int;
    }): string | any[];
    /**
     * Database level destructured JSON deserialization routine to minimize memory overhead.
     * Internally, Loki supports destructuring via loki "serializationMethod' option and
     * the optional LokiPartitioningAdapter class. It is also available if you wish to do
     * your own structured persistence or data exchange.
     * @param destructuredSource - destructured json or array to deserialize from
     * @param [options] - source format options
     * @param [options.partitioned = false] - whether db and each collection are separate
     * @param [options.partition] - can be used to deserialize only a single partition
     * @param [options.delimited = true] - whether subitems are delimited or subarrays
     * @param [options.delimiter] - override default delimiter
     * @returns An object representation of the deserialized database, not yet applied to 'this' db or document array
     */
    deserializeDestructured(destructuredSource: string | any[], options?: {
        partitioned?: boolean;
        partition?: int;
        delimited?: boolean;
        delimiter?: string;
    }): any | any[];
    /**
     * Collection level utility function to deserializes a destructured collection.
     * @param destructuredSource - destructured representation of collection to inflate
     * @param [options] - used to describe format of destructuredSource input
     * @param [options.delimited = false] - whether source is delimited string or an array
     * @param [options.delimiter] - if delimited, this is delimiter to use (if other than default)
     * @returns an array of documents to attach to collection.data.
     */
    deserializeCollection(destructuredSource: string | any[], options?: {
        delimited?: int;
        delimiter?: string;
    }): any[];
    /**
     * Inflates a loki database from a serialized JSON string
     * @param serializedDb - a serialized loki database string
     * @param [options] - apply or override collection level settings
     * @param options.retainDirtyFlags - whether collection dirty flags will be preserved
     */
    loadJSON(serializedDb: string, options?: {
        retainDirtyFlags: boolean;
    }): void;
    /**
     * Inflates a loki database from a JS object
     * @param dbObject - a serialized loki database string
     * @param [options] - apply or override collection level settings
     * @param options.retainDirtyFlags - whether collection dirty flags will be preserved
     */
    loadJSONObject(dbObject: any, options?: {
        retainDirtyFlags: boolean;
    }): void;
    /**
     * Emits the close event. In autosave scenarios, if the database is dirty, this will save and disable timer.
     * Does not actually destroy the db.
     * @param [callback] - (Optional) if supplied will be registered with close event before emitting.
     */
    close(callback?: (...params: any[]) => any): void;
    /**
     * (Changes API) : takes all the changes stored in each
     * collection and creates a single array for the entire database. If an array of names
     * of collections is passed then only the included collections will be tracked.
     * @param [optional] - array of collection names. No arg means all collections are processed.
     * @returns array of changes
     */
    generateChangesNotification(optional?: any[]): any[];
    /**
     * (Changes API) - stringify changes for network transmission
     * @returns string representation of the changes
     */
    serializeChanges(): string;
    /**
     * (Changes API) : clears all the changes in all collections.
     */
    clearChanges(): void;
    /**
     * Wait for throttledSaves to complete and invoke your callback when drained or duration is met.
     * @param callback - callback to fire when save queue is drained, it is passed a sucess parameter value
     * @param [options] - configuration options
     * @param options.recursiveWait - (default: true) if after queue is drained, another save was kicked off, wait for it
     * @param options.recursiveWaitLimit - (default: false) limit our recursive waiting to a duration
     * @param options.recursiveWaitLimitDelay - (default: 2000) cutoff in ms to stop recursively re-draining
     */
    throttledSaveDrain(callback: (...params: any[]) => any, options?: {
        recursiveWait: boolean;
        recursiveWaitLimit: boolean;
        recursiveWaitLimitDelay: int;
    }): void;
    /**
     * Handles manually loading from file system, local storage, or adapter (such as indexeddb)
     *    This method utilizes loki configuration options (if provided) to determine which
     *    persistence method to use, or environment detection (if configuration was not provided).
     *    To avoid contention with any throttledSaves, we will drain the save queue first.
     *
     * If you are configured with autosave, you do not need to call this method yourself.
     * @example
     * db.loadDatabase({}, function(err) {
     *   if (err) {
     *     console.log("error : " + err);
     *   }
     *   else {
     *     console.log("database loaded.");
     *   }
     * });
     * @param options - if throttling saves and loads, this controls how we drain save queue before loading
     * @param options.recursiveWait - (default: true) wait recursively until no saves are queued
     * @param options.recursiveWaitLimit - (default: false) limit our recursive waiting to a duration
     * @param options.recursiveWaitLimitDelay - (default: 2000) cutoff in ms to stop recursively re-draining
     * @param [callback] - (Optional) user supplied async callback / error handler
     */
    loadDatabase(options: {
        recursiveWait: boolean;
        recursiveWaitLimit: boolean;
        recursiveWaitLimitDelay: int;
    }, callback?: (...params: any[]) => any): void;
    /**
     * Handles manually saving to file system, local storage, or adapter (such as indexeddb)
     *    This method utilizes loki configuration options (if provided) to determine which
     *    persistence method to use, or environment detection (if configuration was not provided).
     *
     * If you are configured with autosave, you do not need to call this method yourself.
     * @example
     * db.saveDatabase(function(err) {
     *   if (err) {
     *     console.log("error : " + err);
     *   }
     *   else {
     *     console.log("database saved.");
     *   }
     * });
     * @param [callback] - (Optional) user supplied async callback / error handler
     */
    saveDatabase(callback?: (...params: any[]) => any): void;
    /**
     * Handles deleting a database from file system, local
     *    storage, or adapter (indexeddb)
     *    This method utilizes loki configuration options (if provided) to determine which
     *    persistence method to use, or environment detection (if configuration was not provided).
     * @param [callback] - (Optional) user supplied async callback / error handler
     */
    deleteDatabase(callback?: (...params: any[]) => any): void;
}

/**
 * In in-memory persistence adapter for an in-memory database.
 * This simple 'key/value' adapter is intended for unit testing and diagnostics.
 * @param [options] - memory adapter options
 * @param [options.asyncResponses = false] - whether callbacks are invoked asynchronously
 * @param [options.asyncTimeout = 50] - timeout in ms to queue callbacks
 */
declare class LokiMemoryAdapter {
    constructor(options?: {
        asyncResponses?: boolean;
        asyncTimeout?: int;
    });
    /**
     * Loads a serialized database from its in-memory store.
     * (Loki persistence adapter interface function)
     * @param dbname - name of the database (filename/keyname)
     * @param callback - adapter callback to return load result to caller
     */
    loadDatabase(dbname: string, callback: (...params: any[]) => any): void;
    /**
     * Saves a serialized database to its in-memory store.
     * (Loki persistence adapter interface function)
     * @param dbname - name of the database (filename/keyname)
     * @param callback - adapter callback to return load result to caller
     */
    saveDatabase(dbname: string, callback: (...params: any[]) => any): void;
    /**
     * Deletes a database from its in-memory store.
     * @param dbname - name of the database (filename/keyname)
     * @param callback - function to call when done
     */
    deleteDatabase(dbname: string, callback: (...params: any[]) => any): void;
}

/**
 * An adapter for adapters.  Converts a non reference mode adapter into a reference mode adapter
 * which can perform destructuring and partioning.  Each collection will be stored in its own key/save and
 * only dirty collections will be saved.  If you  turn on paging with default page size of 25megs and save
 * a 75 meg collection it should use up roughly 3 save slots (key/value pairs sent to inner adapter).
 * A dirty collection that spans three pages will save all three pages again
 * Paging mode was added mainly because Chrome has issues saving 'too large' of a string within a
 * single indexeddb row.  If a single document update causes the collection to be flagged as dirty, all
 * of that collection's pages will be written on next save.
 * @param adapter - reference to a 'non-reference' mode loki adapter instance.
 * @param [options] - configuration options for partitioning and paging
 * @param options.paging - (default: false) set to true to enable paging collection data.
 * @param options.pageSize - (default : 25MB) you can use this to limit size of strings passed to inner adapter.
 * @param options.delimiter - allows you to override the default delimeter
 */
declare class LokiPartitioningAdapter {
    constructor(adapter: any, options?: {
        paging: boolean;
        pageSize: int;
        delimiter: string;
    });
    /**
     * Loads a database which was partitioned into several key/value saves.
     * (Loki persistence adapter interface function)
     * @param dbname - name of the database (filename/keyname)
     * @param callback - adapter callback to return load result to caller
     */
    loadDatabase(dbname: string, callback: (...params: any[]) => any): void;
    /**
     * Saves a database by partioning into separate key/value saves.
     * (Loki 'reference mode' persistence adapter interface function)
     * @param dbname - name of the database (filename/keyname)
     * @param dbref - reference to database which we will partition and save.
     * @param callback - adapter callback to return load result to caller
     */
    exportDatabase(dbname: string, dbref: any, callback: (...params: any[]) => any): void;
}

/**
 * A loki persistence adapter which persists using node fs module
 */
declare class LokiFsAdapter {
    /**
     * loadDatabase() - Load data from file, will throw an error if the file does not exist
     * @param dbname - the filename of the database to load
     * @param callback - the callback to handle the result
     */
    loadDatabase(dbname: string, callback: (...params: any[]) => any): void;
    /**
     * saveDatabase() - save data to file, will throw an error if the file can't be saved
     * might want to expand this to avoid dataloss on partial save
     * @param dbname - the filename of the database to load
     * @param callback - the callback to handle the result
     */
    saveDatabase(dbname: string, callback: (...params: any[]) => any): void;
    /**
     * deleteDatabase() - delete the database file, will throw an error if the
     * file can't be deleted
     * @param dbname - the filename of the database to delete
     * @param callback - the callback to handle the result
     */
    deleteDatabase(dbname: string, callback: (...params: any[]) => any): void;
}

/**
 * A loki persistence adapter which persists to web browser's local storage object
 */
declare class LokiLocalStorageAdapter {
    /**
     * loadDatabase() - Load data from localstorage
     * @param dbname - the name of the database to load
     * @param callback - the callback to handle the result
     */
    loadDatabase(dbname: string, callback: (...params: any[]) => any): void;
    /**
     * saveDatabase() - save data to localstorage, will throw an error if the file can't be saved
     * might want to expand this to avoid dataloss on partial save
     * @param dbname - the filename of the database to load
     * @param callback - the callback to handle the result
     */
    saveDatabase(dbname: string, callback: (...params: any[]) => any): void;
    /**
     * deleteDatabase() - delete the database from localstorage, will throw an error if it
     * can't be deleted
     * @param dbname - the filename of the database to delete
     * @param callback - the callback to handle the result
     */
    deleteDatabase(dbname: string, callback: (...params: any[]) => any): void;
}

/**
 * Resultset class allowing chainable queries.  Intended to be instanced internally.
 *    Collection.find(), Collection.where(), and Collection.chain() instantiate this.
 * @example
 * mycollection.chain()
 *      .find({ 'doors' : 4 })
 *      .where(function(obj) { return obj.name === 'Toyota' })
 *      .data();
 * @param collection - The collection which this Resultset will query against.
 */
declare class Resultset {
    constructor(collection: Collection);
    /**
     * copy() - To support reuse of resultset in branched query situations.
     * @returns Returns a copy of the resultset (set) but the underlying document references will be the same.
     */
    copy(): Resultset;
    /**
     * Alias of copy()
     */
    branch: any;
    /**
     * transform() - executes a named collection transform or raw array of transform steps against the resultset.
     * @example
     * users.addTransform('CountryFilter', [
     *   {
     *     type: 'find',
     *     value: {
     *       'country': { $eq: '[%lktxp]Country' }
     *     }
     *   },
     *   {
     *     type: 'simplesort',
     *     property: 'age',
     *     options: { desc: false}
     *   }
     * ]);
     * var results = users.chain().transform("CountryFilter", { Country: 'fr' }).data();
     * @param transform - name of collection transform or raw transform array
     * @param [parameters] - (Optional) object property hash of parameters, if the transform requires them.
     * @returns either (this) resultset or a clone of of this resultset (depending on steps)
     */
    transform(transform: string | any[], parameters?: any): Resultset;
    /**
     * User supplied compare function is provided two documents to compare. (chainable)
     * @example
     * rslt.sort(function(obj1, obj2) {
     *      if (obj1.name === obj2.name) return 0;
     *      if (obj1.name > obj2.name) return 1;
     *      if (obj1.name < obj2.name) return -1;
     *    });
     * @param comparefun - A javascript compare function used for sorting.
     * @returns Reference to this resultset, sorted, for future chain operations.
     */
    sort(comparefun: (...params: any[]) => any): Resultset;
    /**
     * Simpler, loose evaluation for user to sort based on a property name. (chainable).
     *    Sorting based on the same lt/gt helper functions used for binary indices.
     * @example
     * var results = users.chain().simplesort('age').data();
     * @param propname - name of property to sort by.
     * @param options - boolean to specify if isdescending, or options object
     * @param [options.desc = false] - whether to sort descending
     * @param [options.disableIndexIntersect = false] - whether we should explicity not use array intersection.
     * @param [options.forceIndexIntersect = false] - force array intersection (if binary index exists).
     * @param [options.useJavascriptSorting = false] - whether results are sorted via basic javascript sort.
     * @returns Reference to this resultset, sorted, for future chain operations.
     */
    simplesort(propname: string, options: {
        desc?: boolean;
        disableIndexIntersect?: boolean;
        forceIndexIntersect?: boolean;
        useJavascriptSorting?: boolean;
    }): Resultset;
    /**
     * Allows sorting a resultset based on multiple columns.
     * @example
     * // to sort by age and then name (both ascending)
     * rs.compoundsort(['age', 'name']);
     * // to sort by age (ascending) and then by name (descending)
     * rs.compoundsort(['age', ['name', true]]);
     * @param properties - array of property names or subarray of [propertyname, isdesc] used evaluate sort order
     * @returns Reference to this resultset, sorted, for future chain operations.
     */
    compoundsort(properties: any[]): Resultset;
    /**
     * Used for querying via a mongo-style query object.
     * @example
     * var over30 = users.chain().find({ age: { $gte: 30 } }).data();
     * @param query - A mongo-style query object used for filtering current results.
     * @param [firstOnly] - (Optional) Used by collection.findOne()
     * @returns this resultset for further chain ops.
     */
    find(query: any, firstOnly?: boolean): Resultset;
    /**
     * where() - Used for filtering via a javascript filter function.
     * @example
     * var over30 = users.chain().where(function(obj) { return obj.age >= 30; }.data();
     * @param fun - A javascript function used for filtering current results by.
     * @returns this resultset for further chain ops.
     */
    where(fun: (...params: any[]) => any): Resultset;
    /**
     * count() - returns the number of documents in the resultset.
     * @example
     * var over30Count = users.chain().find({ age: { $gte: 30 } }).count();
     * @returns The number of documents in the resultset.
     */
    count(): number;
    /**
     * Terminates the chain and returns array of filtered documents
     * @example
     * var resutls = users.chain().find({ age: 34 }).data();
     * @param [options] - allows specifying 'forceClones' and 'forceCloneMethod' options.
     * @param options.forceClones - Allows forcing the return of cloned objects even when
     *        the collection is not configured for clone object.
     * @param options.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     *        Possible values include 'parse-stringify', 'jquery-extend-deep', 'shallow', 'shallow-assign'
     * @param options.removeMeta - Will force clones and strip $loki and meta properties from documents
     * @returns Array of documents in the resultset
     */
    data(options?: {
        forceClones: boolean;
        forceCloneMethod: string;
        removeMeta: boolean;
    }): any[];
    /**
     * Used to run an update operation on all documents currently in the resultset.
     * @example
     * users.chain().find({ country: 'de' }).update(function(user) {
     *   user.phoneFormat = "+49 AAAA BBBBBB";
     * });
     * @param updateFunction - User supplied updateFunction(obj) will be executed for each document object.
     * @returns this resultset for further chain ops.
     */
    update(updateFunction: (...params: any[]) => any): Resultset;
    /**
     * Removes all document objects which are currently in resultset from collection (as well as resultset)
     * @example
     * // remove users inactive since 1/1/2001
     * users.chain().find({ lastActive: { $lte: new Date("1/1/2001").getTime() } }).remove();
     * @returns this (empty) resultset for further chain ops.
     */
    remove(): Resultset;
    /**
     * data transformation via user supplied functions
     * @example
     * var db = new loki("order.db");
     * var orders = db.addCollection("orders");
     * orders.insert([{ qty: 4, unitCost: 100.00 }, { qty: 10, unitCost: 999.99 }, { qty: 2, unitCost: 49.99 }]);
     *
     * function mapfun (obj) { return obj.qty*obj.unitCost };
     * function reducefun(array) {
     *   var grandTotal=0;
     *   array.forEach(function(orderTotal) { grandTotal += orderTotal; });
     *   return grandTotal;
     * }
     * var grandOrderTotal = orders.chain().mapReduce(mapfun, reducefun);
     * console.log(grandOrderTotal);
     * @param mapFunction - this function accepts a single document for you to transform and return
     * @param reduceFunction - this function accepts many (array of map outputs) and returns single value
     * @returns The output of your reduceFunction
     */
    mapReduce(mapFunction: (...params: any[]) => any, reduceFunction: (...params: any[]) => any): value;
    /**
     * eqJoin() - Left joining two sets of data. Join keys can be defined or calculated properties
     * eqJoin expects the right join key values to be unique.  Otherwise left data will be joined on the last joinData object with that key
     * @example
     * var db = new loki('sandbox.db');
     *
     * var products = db.addCollection('products');
     * var orders = db.addCollection('orders');
     *
     * products.insert({ productId: "100234", name: "flywheel energy storage", unitCost: 19999.99 });
     * products.insert({ productId: "140491", name: "300F super capacitor", unitCost: 129.99 });
     * products.insert({ productId: "271941", name: "fuel cell", unitCost: 3999.99 });
     * products.insert({ productId: "174592", name: "390V 3AH lithium bank", unitCost: 4999.99 });
     *
     * orders.insert({ orderDate : new Date("12/1/2017").getTime(), prodId: "174592", qty: 2, customerId: 2 });
     * orders.insert({ orderDate : new Date("4/15/2016").getTime(), prodId: "271941", qty: 1, customerId: 1 });
     * orders.insert({ orderDate : new Date("3/12/2017").getTime(), prodId: "140491", qty: 4, customerId: 4 });
     * orders.insert({ orderDate : new Date("7/31/2017").getTime(), prodId: "100234", qty: 7, customerId: 3 });
     * orders.insert({ orderDate : new Date("8/3/2016").getTime(), prodId: "174592", qty: 3, customerId: 5 });
     *
     * var mapfun = function(left, right) {
     *   return {
     *     orderId: left.$loki,
     *     orderDate: new Date(left.orderDate) + '',
     *     customerId: left.customerId,
     *     qty: left.qty,
     *     productId: left.prodId,
     *     prodName: right.name,
     *     prodCost: right.unitCost,
     *     orderTotal: +((right.unitCost * left.qty).toFixed(2))
     *   };
     * };
     *
     * // join orders with relevant product info via eqJoin
     * var orderSummary = orders.chain().eqJoin(products, "prodId", "productId", mapfun).data();
     *
     * console.log(orderSummary);
     * @param joinData - Data array to join to.
     * @param leftJoinKey - Property name in this result set to join on or a function to produce a value to join on
     * @param rightJoinKey - Property name in the joinData to join on or a function to produce a value to join on
     * @param [mapFun] - (Optional) A function that receives each matching pair and maps them into output objects - function(left,right){return joinedObject}
     * @param [dataOptions] - options to data() before input to your map function
     * @param dataOptions.removeMeta - allows removing meta before calling mapFun
     * @param dataOptions.forceClones - forcing the return of cloned objects to your map object
     * @param dataOptions.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     * @returns A resultset with data in the format [{left: leftObj, right: rightObj}]
     */
    eqJoin(joinData: any[] | Resultset | Collection, leftJoinKey: string | ((...params: any[]) => any), rightJoinKey: string | ((...params: any[]) => any), mapFun?: (...params: any[]) => any, dataOptions?: {
        removeMeta: boolean;
        forceClones: boolean;
        forceCloneMethod: string;
    }): Resultset;
    /**
     * Applies a map function into a new collection for further chaining.
     * @example
     * var orders.chain().find({ productId: 32 }).map(function(obj) {
     *   return {
     *     orderId: $loki,
     *     productId: productId,
     *     quantity: qty
     *   };
     * });
     * @param mapFun - javascript map function
     * @param [dataOptions] - options to data() before input to your map function
     * @param dataOptions.removeMeta - allows removing meta before calling mapFun
     * @param dataOptions.forceClones - forcing the return of cloned objects to your map object
     * @param dataOptions.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     */
    map(mapFun: (...params: any[]) => any, dataOptions?: {
        removeMeta: boolean;
        forceClones: boolean;
        forceCloneMethod: string;
    }): void;
}

declare interface DynamicView extends LokiEventEmitter {
}

/**
 * DynamicView class is a versatile 'live' view class which can have filters and sorts applied.
 *    Collection.addDynamicView(name) instantiates this DynamicView object and notifies it
 *    whenever documents are add/updated/removed so it can remain up-to-date. (chainable)
 * @example
 * var mydv = mycollection.addDynamicView('test');  // default is non-persistent
 * mydv.applyFind({ 'doors' : 4 });
 * mydv.applyWhere(function(obj) { return obj.name === 'Toyota'; });
 * var results = mydv.data();
 * @param collection - A reference to the collection to work against
 * @param name - The name of this dynamic view
 * @param [options] - (Optional) Pass in object with 'persistent' and/or 'sortPriority' options.
 * @param [options.persistent = false] - indicates if view is to main internal results array in 'resultdata'
 * @param [options.sortPriority = 'passive'] - 'passive' (sorts performed on call to data) or 'active' (after updates)
 * @param options.minRebuildInterval - minimum rebuild interval (need clarification to docs here)
 */
declare class DynamicView implements LokiEventEmitter {
    constructor(collection: Collection, name: string, options?: {
        persistent?: boolean;
        sortPriority?: string;
        minRebuildInterval: number;
    });
    /**
     * rematerialize() - internally used immediately after deserialization (loading)
     *    This will clear out and reapply filterPipeline ops, recreating the view.
     *    Since where filters do not persist correctly, this method allows
     *    restoring the view to state where user can re-apply those where filters.
     * @param [options] - (Optional) allows specification of 'removeWhereFilters' option
     * @returns This dynamic view for further chained ops.
     */
    rematerialize(options?: any): DynamicView;
    /**
     * branchResultset() - Makes a copy of the internal resultset for branched queries.
     *    Unlike this dynamic view, the branched resultset will not be 'live' updated,
     *    so your branched query should be immediately resolved and not held for future evaluation.
     * @example
     * var db = new loki('test');
     * var coll = db.addCollection('mydocs');
     * var dv = coll.addDynamicView('myview');
     * var tx = [
     *   {
     *     type: 'offset',
     *     value: '[%lktxp]pageStart'
     *   },
     *   {
     *     type: 'limit',
     *     value: '[%lktxp]pageSize'
     *   }
     * ];
     * coll.addTransform('viewPaging', tx);
     *
     * // add some records
     *
     * var results = dv.branchResultset('viewPaging', { pageStart: 10, pageSize: 10 }).data();
     * @param transform - Optional name of collection transform, or an array of transform steps
     * @param [parameters] - optional parameters (if optional transform requires them)
     * @returns A copy of the internal resultset for branched queries.
     */
    branchResultset(transform: string | any[], parameters?: any): Resultset;
    /**
     * removeFilters() - Used to clear pipeline and reset dynamic view to initial state.
     *     Existing options should be retained.
     * @param [options] - configure removeFilter behavior
     * @param [options.queueSortPhase] - (default: false) if true we will async rebuild view (maybe set default to true in future?)
     */
    removeFilters(options?: {
        queueSortPhase?: boolean;
    }): void;
    /**
     * applySort() - Used to apply a sort to the dynamic view
     * @example
     * dv.applySort(function(obj1, obj2) {
     *   if (obj1.name === obj2.name) return 0;
     *   if (obj1.name > obj2.name) return 1;
     *   if (obj1.name < obj2.name) return -1;
     * });
     * @param comparefun - a javascript compare function used for sorting
     * @returns this DynamicView object, for further chain ops.
     */
    applySort(comparefun: (...params: any[]) => any): DynamicView;
    /**
     * applySimpleSort() - Used to specify a property used for view translation.
     * @example
     * dv.applySimpleSort("name");
     * @param propname - Name of property by which to sort.
     * @param options - boolean for sort descending or options object
     * @param [options.desc = false] - whether we should sort descending.
     * @param [options.disableIndexIntersect = false] - whether we should explicity not use array intersection.
     * @param [options.forceIndexIntersect = false] - force array intersection (if binary index exists).
     * @param [options.useJavascriptSorting = false] - whether results are sorted via basic javascript sort.
     * @returns this DynamicView object, for further chain ops.
     */
    applySimpleSort(propname: string, options: {
        desc?: boolean;
        disableIndexIntersect?: boolean;
        forceIndexIntersect?: boolean;
        useJavascriptSorting?: boolean;
    }): DynamicView;
    /**
     * applySortCriteria() - Allows sorting a resultset based on multiple columns.
     * @example
     * // to sort by age and then name (both ascending)
     * dv.applySortCriteria(['age', 'name']);
     * // to sort by age (ascending) and then by name (descending)
     * dv.applySortCriteria(['age', ['name', true]);
     * // to sort by age (descending) and then by name (descending)
     * dv.applySortCriteria(['age', true], ['name', true]);
     * @param properties - array of property names or subarray of [propertyname, isdesc] used evaluate sort order
     * @returns Reference to this DynamicView, sorted, for future chain operations.
     */
    applySortCriteria(properties: any[]): DynamicView;
    /**
     * applyFilter() - Adds or updates a filter in the DynamicView filter pipeline
     * @param filter - A filter object to add to the pipeline.
     *    The object is in the format { 'type': filter_type, 'val', filter_param, 'uid', optional_filter_id }
     * @returns this DynamicView object, for further chain ops.
     */
    applyFilter(filter: any): DynamicView;
    /**
     * applyFind() - Adds or updates a mongo-style query option in the DynamicView filter pipeline
     * @param query - A mongo-style query object to apply to pipeline
     * @param [uid] - Optional: The unique ID of this filter, to reference it in the future.
     * @returns this DynamicView object, for further chain ops.
     */
    applyFind(query: any, uid?: string | number): DynamicView;
    /**
     * applyWhere() - Adds or updates a javascript filter function in the DynamicView filter pipeline
     * @param fun - A javascript filter function to apply to pipeline
     * @param [uid] - Optional: The unique ID of this filter, to reference it in the future.
     * @returns this DynamicView object, for further chain ops.
     */
    applyWhere(fun: (...params: any[]) => any, uid?: string | number): DynamicView;
    /**
     * removeFilter() - Remove the specified filter from the DynamicView filter pipeline
     * @param uid - The unique ID of the filter to be removed.
     * @returns this DynamicView object, for further chain ops.
     */
    removeFilter(uid: string | number): DynamicView;
    /**
     * count() - returns the number of documents representing the current DynamicView contents.
     * @returns The number of documents representing the current DynamicView contents.
     */
    count(): number;
    /**
     * data() - resolves and pending filtering and sorting, then returns document array as result.
     * @param [options] - optional parameters to pass to resultset.data() if non-persistent
     * @param options.forceClones - Allows forcing the return of cloned objects even when
     *        the collection is not configured for clone object.
     * @param options.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     *        Possible values include 'parse-stringify', 'jquery-extend-deep', 'shallow', 'shallow-assign'
     * @param options.removeMeta - Will force clones and strip $loki and meta properties from documents
     * @returns An array of documents representing the current DynamicView contents.
     */
    data(options?: {
        forceClones: boolean;
        forceCloneMethod: string;
        removeMeta: boolean;
    }): any[];
    /**
     * mapReduce() - data transformation via user supplied functions
     * @param mapFunction - this function accepts a single document for you to transform and return
     * @param reduceFunction - this function accepts many (array of map outputs) and returns single value
     * @returns The output of your reduceFunction
     */
    mapReduce(mapFunction: (...params: any[]) => any, reduceFunction: (...params: any[]) => any): any;
}

declare interface Collection extends LokiEventEmitter {
}

/**
 * Collection class that handles documents of same type
 * @param name - collection name
 * @param [options] - (optional) array of property names to be indicized OR a configuration object
 * @param [options.unique = []] - array of property names to define unique constraints for
 * @param [options.exact = []] - array of property names to define exact constraints for
 * @param [options.indices = []] - array property names to define binary indexes for
 * @param [options.adaptiveBinaryIndices = true] - collection indices will be actively rebuilt rather than lazily
 * @param [options.asyncListeners = false] - whether listeners are invoked asynchronously
 * @param [options.disableMeta = false] - set to true to disable meta property on documents
 * @param [options.disableChangesApi = true] - set to false to enable Changes API
 * @param [options.disableDeltaChangesApi = true] - set to false to enable Delta Changes API (requires Changes API, forces cloning)
 * @param [options.autoupdate = false] - use Object.observe to update objects automatically
 * @param [options.clone = false] - specify whether inserts and queries clone to/from user
 * @param [options.serializableIndices = true[]] - converts date values on binary indexed properties to epoch time
 * @param [options.disableFreeze = true] - when false all docs are frozen
 * @param [options.cloneMethod = 'parse-stringify'] - 'parse-stringify', 'jquery-extend-deep', 'shallow', 'shallow-assign'
 * @param [options.ttl] - age of document (in ms.) before document is considered aged/stale.
 * @param [options.ttlInterval] - time interval for clearing out 'aged' documents; not set by default.
 */
declare class Collection implements LokiEventEmitter {
    constructor(name: string, options?: {
        unique?: any[];
        exact?: any[];
        indices?: any[];
        adaptiveBinaryIndices?: boolean;
        asyncListeners?: boolean;
        disableMeta?: boolean;
        disableChangesApi?: boolean;
        disableDeltaChangesApi?: boolean;
        autoupdate?: boolean;
        clone?: boolean;
        serializableIndices?: boolean;
        disableFreeze?: boolean;
        cloneMethod?: string;
        ttl?: int;
        ttlInterval?: int;
    });
    /**
     * Adds a named collection transform to the collection
     * @example
     * users.addTransform('progeny', [
     *   {
     *     type: 'find',
     *     value: {
     *       'age': {'$lte': 40}
     *     }
     *   }
     * ]);
     *
     * var results = users.chain('progeny').data();
     * @param name - name to associate with transform
     * @param transform - an array of transformation 'step' objects to save into the collection
     */
    addTransform(name: string, transform: any[]): void;
    /**
     * Retrieves a named transform from the collection.
     * @param name - name of the transform to lookup.
     */
    getTransform(name: string): void;
    /**
     * Updates a named collection transform to the collection
     * @param name - name to associate with transform
     * @param transform - a transformation object to save into collection
     */
    setTransform(name: string, transform: any): void;
    /**
     * Removes a named collection transform from the collection
     * @param name - name of collection transform to remove
     */
    removeTransform(name: string): void;
    /**
     * Updates or applies collection TTL settings.
     * @param age - age (in ms) to expire document from collection
     * @param interval - time (in ms) to clear collection of aged documents.
     */
    setTTL(age: int, interval: int): void;
    /**
     * Will allow reconfiguring certain collection options.
     * @param options.adaptiveBinaryIndices - collection indices will be actively rebuilt rather than lazily
     */
    configureOptions(): void;
    /**
     * Ensure binary index on a certain field
     * @param property - name of property to create binary index on
     * @param [force] - (Optional) flag indicating whether to construct index immediately
     */
    ensureIndex(property: string, force?: boolean): void;
    /**
     * Perform checks to determine validity/consistency of all binary indices
     * @example
     * // check all indices on a collection, returns array of invalid index names
     * var result = coll.checkAllIndexes({ repair: true, randomSampling: true, randomSamplingFactor: 0.15 });
     * if (result.length > 0) {
     *   results.forEach(function(name) {
     *     console.log('problem encountered with index : ' + name);
     *   });
     * }
     * @param [options] - optional configuration object
     * @param [options.randomSampling = false] - whether (faster) random sampling should be used
     * @param [options.randomSamplingFactor = 0.10] - percentage of total rows to randomly sample
     * @param [options.repair = false] - whether to fix problems if they are encountered
     * @returns array of index names where problems were found.
     */
    checkAllIndexes(options?: {
        randomSampling?: boolean;
        randomSamplingFactor?: number;
        repair?: boolean;
    }): string[];
    /**
     * Perform checks to determine validity/consistency of a binary index
     * @example
     * // full test
     * var valid = coll.checkIndex('name');
     * // full test with repair (if issues found)
     * valid = coll.checkIndex('name', { repair: true });
     * // random sampling (default is 10% of total document count)
     * valid = coll.checkIndex('name', { randomSampling: true });
     * // random sampling (sample 20% of total document count)
     * valid = coll.checkIndex('name', { randomSampling: true, randomSamplingFactor: 0.20 });
     * // random sampling (implied boolean)
     * valid = coll.checkIndex('name', { randomSamplingFactor: 0.20 });
     * // random sampling with repair (if issues found)
     * valid = coll.checkIndex('name', { repair: true, randomSampling: true });
     * @param property - name of the binary-indexed property to check
     * @param [options] - optional configuration object
     * @param [options.randomSampling = false] - whether (faster) random sampling should be used
     * @param [options.randomSamplingFactor = 0.10] - percentage of total rows to randomly sample
     * @param [options.repair = false] - whether to fix problems if they are encountered
     * @returns whether the index was found to be valid (before optional correcting).
     */
    checkIndex(property: string, options?: {
        randomSampling?: boolean;
        randomSamplingFactor?: number;
        repair?: boolean;
    }): boolean;
    /**
     * Ensure all binary indices
     * @param force - whether to force rebuild of existing lazy binary indices
     */
    ensureAllIndexes(force: boolean): void;
    /**
     * Quickly determine number of documents in collection (or query)
     * @param [query] - (optional) query object to count results of
     * @returns number of documents in the collection
     */
    count(query?: any): number;
    /**
     * Add a dynamic view to the collection
     * @example
     * var pview = users.addDynamicView('progeny');
     * pview.applyFind({'age': {'$lte': 40}});
     * pview.applySimpleSort('name');
     *
     * var results = pview.data();
     * @param name - name of dynamic view to add
     * @param [options] - options to configure dynamic view with
     * @param [options.persistent = false] - indicates if view is to main internal results array in 'resultdata'
     * @param [options.sortPriority = 'passive'] - 'passive' (sorts performed on call to data) or 'active' (after updates)
     * @param options.minRebuildInterval - minimum rebuild interval (need clarification to docs here)
     * @returns reference to the dynamic view added
     */
    addDynamicView(name: string, options?: {
        persistent?: boolean;
        sortPriority?: string;
        minRebuildInterval: number;
    }): DynamicView;
    /**
     * Remove a dynamic view from the collection
     * @param name - name of dynamic view to remove
     */
    removeDynamicView(name: string): void;
    /**
     * Look up dynamic view reference from within the collection
     * @param name - name of dynamic view to retrieve reference of
     * @returns A reference to the dynamic view with that name
     */
    getDynamicView(name: string): DynamicView;
    /**
     * Applies a 'mongo-like' find query object and passes all results to an update function.
     * For filter function querying you should migrate to [updateWhere()]{@link Collection#updateWhere}.
     * @param filterObject - 'mongo-like' query object (or deprecated filterFunction mode)
     * @param updateFunction - update function to run against filtered documents
     */
    findAndUpdate(filterObject: any | ((...params: any[]) => any), updateFunction: (...params: any[]) => any): void;
    /**
     * Applies a 'mongo-like' find query object removes all documents which match that filter.
     * @param filterObject - 'mongo-like' query object
     */
    findAndRemove(filterObject: any): void;
    /**
     * Adds object(s) to collection, ensure object(s) have meta properties, clone it if necessary, etc.
     * @example
     * users.insert({
     *     name: 'Odin',
     *     age: 50,
     *     address: 'Asgard'
     * });
     *
     * // alternatively, insert array of documents
     * users.insert([{ name: 'Thor', age: 35}, { name: 'Loki', age: 30}]);
     * @param doc - the document (or array of documents) to be inserted
     * @param [overrideAdaptiveIndices] - (optional) if `true`, adaptive indicies will be
     *   temporarily disabled and then fully rebuilt after batch. This will be faster for
     *   large inserts, but slower for small/medium inserts in large collections
     * @returns document or documents inserted
     */
    insert(doc: any | any[], overrideAdaptiveIndices?: boolean): any | any[];
    /**
     * Empties the collection.
     * @param [options] - configure clear behavior
     * @param [options.removeIndices = false] - whether to remove indices in addition to data
     */
    clear(options?: {
        removeIndices?: boolean;
    }): void;
    /**
     * Updates an object and notifies collection that the document has changed.
     * @param doc - document to update within the collection
     */
    update(doc: any): void;
    /**
     * Applies a filter function and passes all results to an update function.
     * @param filterFunction - filter function whose results will execute update
     * @param updateFunction - update function to run against filtered documents
     */
    updateWhere(filterFunction: (...params: any[]) => any, updateFunction: (...params: any[]) => any): void;
    /**
     * Remove all documents matching supplied filter function.
     * For 'mongo-like' querying you should migrate to [findAndRemove()]{@link Collection#findAndRemove}.
     * @param query - query object to filter on
     */
    removeWhere(query: ((...params: any[]) => any) | any): void;
    /**
     * Remove a document from the collection
     * @param doc - document to remove from collection
     */
    remove(doc: any): void;
    /**
     * Get by Id - faster than other methods because of the searching algorithm
     * @param id - $loki id of document you want to retrieve
     * @param returnPosition - if 'true' we will return [object, position]
     * @returns Object reference if document was found, null if not,
     *     or an array if 'returnPosition' was passed.
     */
    get(id: int, returnPosition: boolean): any | any[] | null;
    /**
     * Retrieve doc by Unique index
     * @param field - name of uniquely indexed property to use when doing lookup
     * @param value - unique value to search for
     * @returns document matching the value passed
     */
    by(field: string, value: value): any;
    /**
     * Find one object by index property, by property equal to value
     * @param query - query object used to perform search with
     * @returns First matching document, or null if none
     */
    findOne(query: any): any | null;
    /**
     * Chain method, used for beginning a series of chained find() and/or view() operations
     * on a collection.
     * @param transform - named transform or array of transform steps
     * @param [parameters] - Object containing properties representing parameters to substitute
     * @returns (this) resultset, or data array if any map or join functions where called
     */
    chain(transform: string | any[], parameters?: any): Resultset;
    /**
     * Find method, api is similar to mongodb.
     * for more complex queries use [chain()]{@link Collection#chain} or [where()]{@link Collection#where}.
     * @example
     * {@tutorial Query Examples}
     * @param query - 'mongo-like' query object
     * @returns Array of matching documents
     */
    find(query: any): any[];
    /**
     * Query the collection by supplying a javascript filter function.
     * @example
     * var results = coll.where(function(obj) {
     *   return obj.legs === 8;
     * });
     * @param fun - filter function to run against all collection docs
     * @returns all documents which pass your filter function
     */
    where(fun: (...params: any[]) => any): any[];
    /**
     * Map Reduce operation
     * @param mapFunction - function to use as map function
     * @param reduceFunction - function to use as reduce function
     * @returns The result of your mapReduce operation
     */
    mapReduce(mapFunction: (...params: any[]) => any, reduceFunction: (...params: any[]) => any): data;
    /**
     * Join two collections on specified properties
     * @param joinData - array of documents to 'join' to this collection
     * @param leftJoinProp - property name in collection
     * @param rightJoinProp - property name in joinData
     * @param [mapFun] - (Optional) map function to use
     * @param [dataOptions] - options to data() before input to your map function
     * @param dataOptions.removeMeta - allows removing meta before calling mapFun
     * @param dataOptions.forceClones - forcing the return of cloned objects to your map object
     * @param dataOptions.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     * @returns Result of the mapping operation
     */
    eqJoin(joinData: any[] | Resultset | Collection, leftJoinProp: string, rightJoinProp: string, mapFun?: (...params: any[]) => any, dataOptions?: {
        removeMeta: boolean;
        forceClones: boolean;
        forceCloneMethod: string;
    }): Resultset;
    /**
     * (Staging API) create a stage and/or retrieve it
     */
    getStage(): void;
    /**
     * (Staging API) create a copy of an object and insert it into a stage
     */
    stage(): void;
    /**
     * (Staging API) re-attach all objects to the original collection, so indexes and views can be rebuilt
     * then create a message to be inserted in the commitlog
     * @param stageName - name of stage
     */
    commitStage(stageName: string, message: string): void;
    extract(): void;
    max(): void;
    min(): void;
    maxRecord(): void;
    minRecord(): void;
    extractNumerical(): void;
    /**
     * Calculates the average numerical value of a property
     * @param field - name of property in docs to average
     * @returns average of property in all docs in the collection
     */
    avg(field: string): number;
    /**
     * Calculate standard deviation of a field
     */
    stdDev(field: string): void;
    mode(field: string): void;
    /**
     * @param field - property name
     */
    median(field: string): void;
}

