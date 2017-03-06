/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */

import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
// Models.

export class ObjectStore {

    /**
     * Creates the object stores.
     * The object store has a list of records which hold the data stored in the object store.
     * Each record consists of a key and a value.
     * 
     * @param db The database
     */
    createStores(db: IDBDatabase) {

        // Creates "TodoStore".
        var todoStore: IDBObjectStore = db.createObjectStore("TodoStore", { keyPath: 'todoId' });
        // Add new stores here.
        
    }

}

/**
 * IndexedDBService class: database operations.
 * https://w3c.github.io/IndexedDB/
 * 
 * Basic usage.
 * 
 * // Services.
 * import {IndexedDBService} from './services/indexedDB.service'; // IndexedDBService class.
 *
 * @Component({
 *     selector: 'app-component',
 *     ...
 *     providers: [IndexedDBService]
 * })
 *
 * export class AppComponent {
 *
 *     constructor(public indexedDB: IndexedDBService) { }
 *     
 * }
 * 
 * In the ObjctStore model, add the object stores:
 * 
 * createStores(db: IDBDatabase) {
 *
 *     // Creates "TodoStore".
 *     var todoStore: IDBObjectStore = db.createObjectStore("TodoStore", { keyPath: 'todoId' });
 *     // Add new stores here.
 *       
 * }
 *
 * IndexedDBService methods.
 * 
 * Each method can be invoked with the forEach method, which accepts a single callback and returns a promise: 
 * 
 * // Opens the database.
 * this.indexedDB.openDBAsync(dbName, 1).forEach(
 *                   
 *     // Next.
 *     (readyState: string) => {
 *
 *         console.log('IndexedDB service: opening db: ' + readyState);
 *
 *     }, null
 *
 * );
 * 
 * @author Roberto Simonetti
 */
@Injectable() export class IndexedDBService {

    /**
     * The database.
     */
    db: IDBDatabase;

    constructor() { }

    /**
     * Opens the database.
     * 
     * @param dbName The name of the database which identifies it within a specific origin
     * @param version The version of the database
     * @return An observable of readyState
     */
    openDBAsync(dbName: string, version: number) {

        return new Observable((observer: Observer<string>) => {
            
            // Opens the database.
            var request: IDBOpenDBRequest = indexedDB.open(dbName, version);

            // Success.
            request.onsuccess = (event: Event) => {

                // Instances the db object.
                this.db = (<IDBOpenDBRequest>event.target).result;

                observer.next((<IDBOpenDBRequest>event.target).readyState);
                observer.complete();

            };        
            // Error.
            request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBOpenDBRequest>event.target).error.name);

                observer.error((<IDBOpenDBRequest>event.target).error.name);


            };
            // The db doesn't exist, so cretes it.
            request.onupgradeneeded = (event: Event) => {
                
                // Instances the db object.
                this.db = (<IDBOpenDBRequest>event.target).result;;
            
                // Instances the ObjectStores class and calls the createStores method.
                var objectStores: ObjectStore = new ObjectStore();
                objectStores.createStores(this.db);

                console.log('IndexedDB service: creating ' + dbName + ' completed.');

            }

        });

    }
    
    /**
     * Gets the object store.
     * 
     * @param storeName The name of the object store
     * @param mode Transaction mode
     * @return The object store
     */
    private getObjectStore(storeName: string, mode: string) {

        var tx: IDBTransaction = this.db.transaction(storeName, mode);
        return tx.objectStore(storeName);

    }
   
    /**
     * Gets all records.
     * 
     * @param storeName The name of the object store
     * @return An observable of record
     */
    getAllRecordsAsync(storeName: string) {
        
        // Gets the object store.
        var store: IDBObjectStore = this.getObjectStore(storeName, "readonly");

        return new Observable((observer: Observer<any>) => {

            var request: IDBRequest = store.openCursor();
        
            // Success.
            request.onsuccess = (event: Event) => {

                // Steps through all the values in the object store.
                var cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;

                if (cursor) {

                    observer.next(cursor.value);
                    cursor.continue();

                }
                else {

                    observer.complete();

                }

            }
            // Error.
            request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);

            }

        });

    }
    
    /**
     * Adds a record.
     * 
     * @param storeName The name of the object store
     * @param record The record to add
     * @return An observable of readyState
     */
    addRecordAsync(storeName: string, record: any) {
        
        // Gets the object store.
        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");

        return new Observable((observer: Observer<string>) => {

            var request: IDBRequest = store.add(record); // Adds a new record.
        
            // Success.
            request.onsuccess = (event: Event) => {

                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();

            }
            // Error.
            request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);

            }

        });

    }
    
    /**
     * Deletes a record.
     * 
     * @param storeName The name of the object store
     * @param key The key of the record to delete
     * @return An observable of readyState
     */
    deleteRecordAsync(storeName: string, key: string) {

        // Gets the object store.
        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");

        return new Observable((observer: Observer<string>) => {

            var request: IDBRequest = store.delete(key); // Deletes the record by the key.
        
            // Success.
            request.onsuccess = (event: Event) => {

                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();

            }
            // Error.
            request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);

            }

        });

    }
    
    /**
     * Edits a record.
     * 
     * @param storeName The name of the object store
     * @param record The record to update
     * @return An observable of readyState
     */
    editRecordAsync(storeName: string, record: any) {

        // Gets the object store.
        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");

        return new Observable((observer: Observer<string>) => {

            var request: IDBRequest = store.put(record); // Puts the updated record back into the database.
        
            // Success.
            request.onsuccess = (event: Event) => {

                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();

            }
            // Error.
            request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);

            }

        });

    }
    
    /**
     * Clears an object store.
     * 
     * @param storeName The name of the object store
     * @return An observable of readyState
     */
    clearObjectStoreAsync(storeName: string) {

        // Gets the object store.
        var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");

        return new Observable((observer: Observer<string>) => {

            var request: IDBRequest = store.clear(); // Clears the object store.
        
            // Success.
            request.onsuccess = (event: Event) => {

                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();

            }
            // Error.
            request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);

            }

        });

    }
    
    /**
     * Closes the database.
     */
    closeDB() {

        this.db.close();

    }

}
