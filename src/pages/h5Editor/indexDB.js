

let db = null;

function openDB() {
    return new Promise((resolve, reject) => {
        if (!db) {
            let dbRequest = window.indexedDB.open("editorBackup", 1);
            dbRequest.onsuccess = e => {
                db = dbRequest.result;
                resolve(db)
            };
            dbRequest.onupgradeneeded = e => {
                db = e.target.result;
                if (!db.objectStoreNames.contains("config")) {
                    db.createObjectStore("config", { keyPath: "pageConfigId" });
                }
                if (!db.objectStoreNames.contains("activity_config")) {
                    db.createObjectStore("activity_config", { keyPath: "activityId" });
                }
                resolve(db)
            }
            dbRequest.onerror = e => {
                reject()
            }
        } else {
            resolve(db)
        }
    })
}

function $get(table, key, fn) {
    openDB()
        .then(
            db => {
                var transaction = db.transaction(table, 'readwrite');
                var store = transaction.objectStore(table);
                var request = store.get(key);
                request.onsuccess = e => {
                    fn(e.target.result)
                }
            }
        )
}

function $add(table, data) {
    openDB()
        .then(
            db => {
                let transaction = db.transaction(table, 'readwrite');
                let store = transaction.objectStore(table);
                store.add(data)
            }
        )
}

function $put(table, value) {
    return openDB().then(
        db => {
            let transaction = db.transaction(table, 'readwrite');
            let store = transaction.objectStore(table);
            store.put(value)
            return Promise.resolve()
        }
    )
}

function $delete(table, key) {

}

export default { $get, $put, $delete, $add }