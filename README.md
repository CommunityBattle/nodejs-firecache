# nodejs-firecache
NodeJS library for firestore caching module. 

This library is used to cache frequently requested data in a way, that stateless applications can perform the same request over and over without doing the actual request onto the database.
It uses snapshot listeners to stay in sync with the real firestore underneath.

Furthermore does it simplify the access to the firestore by wrapping the functionality into a CRUD pattern.

## Testing
This library can be tested through the test/e2e.test.js file.

The following steps are required to successfully run an E2E test:
- Create a new service account on the GCP platform that is permitted to CRUD the firestore
- Download the key set of the service account to the local machine
- Name the file "sa.json" and place it in the root folder of the library
- Run `npm test`

## Usage
```javascript
import Firecache from 'firecache';

let firecache = Firecache.getInstance();

let handler = snapshot => {
    //do something
}

firecache.addListener("test_collection/new_document", handler);

firecache.insert("test_collection/new_document", {foo: "bar"});
let data = await firecache.read("test_collection/new_document");
firecache.update("test_collection/new_document", {foo: "baz"});
firecache.delete("test_collection/new_document");

firecache.removeListener("test_collection/new_document", handler)
```