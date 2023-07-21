# nodejs-firecache
NodeJS library for firestore caching module. 

This library is used to cache frequently requested data in a way, that stateless applications can perform the same request over and over without doing the actual request onto the database.
It uses snapshot listeners to stay in sync with the real firestore underneath.

Furthermore does it simplify the access to the firestore by wrapping the functionality into a CRUD pattern.

> **_NOTE:_** Altering the firestore in any way followed by an immediate read process wont show the altered state of the firestore. Use the `bypassCache` parameter to be able to immediate access the data.

## Usage
```javascript
import Firecache from 'firecache'

let firecache = Firecache.getInstance()

let handler = event => {
    //  do something
}

firecache.addListener("test_collection/new_document", null, handler)
firecache.addListener("test_collection", null, handler, err => {
    // handle error
})

firecache.insert("test_collection/new_document", {foo: "bar"})
let data = await firecache.read("test_collection/new_document", null, true)
// let data = await firecache.read("test_collection/new_document")
firecache.update("test_collection/new_document", {foo: "baz"})
firecache.delete("test_collection/new_document")

firecache.removeListener("test_collection/new_document", null, handler)
firecache.removeListener("test_collection", null, handler)
```

## Testing
This library can be tested through the test/firecache.test.ts file.

The following steps are required to successfully run an E2E test:
- Create a new service account on the GCP platform that is permitted to CRUD the firestore
- Download the key set of the service account to the local machine
- Name the file "sa.json" and place it in the root folder of the library
- Run `npm run test`

There is also a possibility to monitor what the firecache is doing. This should not be used in production, however it also does not harm the production environment in any way.
 ```javascript
import Firecache from 'firecache'

let firecache = Firecache.getInstance()
firecache.monitor()
 ```

 This will produce an output looking like this.

 ```zsh
--------------------------------------------------Firecache Monitor--------------------------------------------------

Currently active firecache caches:
         test/doc2: &{0x7a9e20 0xc00013c820 0xc00013a050 false}
         test: &{0x7a9e20 0xc0004963c0 0xc00049a360 false}

Currently active firecache listeners:
         test/doc2: &{map[0xc0004100f0:0x7a9e20] true {0xc00013a050 <nil> <nil>} 0x304a80}
         test: &{map[0xc0001096b0:0x7a9e20] true {<nil> 0xc00049a360 0xc00049a378} 0x304a80}
--------------------------------------------------Firecache Monitor--------------------------------------------------
 ```

## Limits
By design this library is not build to be lightning fast in any way. It is written efficiently but it will never be able to compete with nativly calling the firestore. 

Its cache ttl is hardcoded to 1 hour resetting it each time a request to the data is performed. This can lead to a lot of memory being used for the caching logic. It is recommended to use this only in manages environment. Furthermore it is recommended to not inflate the cache by caching each firestore call that is done. Consider what makes sense to be cached and only cache this data. Otherwise use the `bypassCache` parameter to interact with the firestore or use the go client directly.