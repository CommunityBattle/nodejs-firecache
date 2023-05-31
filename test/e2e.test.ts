import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { Firecache, FirestoreNoDataError } from '../lib/esm/index';

describe("Insert a document to the Firestore", () => {
    let firecache = Firecache.getInstance();

    it("should successfully insert a document into the firestore", async () => {
        firecache.insert("test/test_doc", {test_field: "test_value"});
        let data = await firecache.read("test/test_doc");
        assert.deepEqual(data, {test_field: "test_value"});
    });

    it("should fail inserting another document with the same name into the firestore", async () => {
        try {
            firecache.insert("test/test_doc", {test_field: "test_value"});
            assert.fail("entry was wrongfully insertable");
        } catch (err) {
            assert.deepEqual(err, new FirestoreNoDataError());
        }
    });
});

describe("Read a document from the Firestore", () => {
    let firecache = Firecache.getInstance();

    it("should successfully read a document from the firestore", async () => {
        let data = await firecache.read("test/test_doc");
        assert.deepEqual(data, {test_field: "test_value"});
    })

    it("should fail while reading a not existing document from the firestore", async () => {
        try {
            let data = await firecache.read("test/test_doc_not_existing");
            assert.fail("found entry while it should not have found one");
        } catch (err) {
            assert.deepEqual(err, new FirestoreNoDataError());
        }
    });
});

describe("Update a document in the Firestore", () => {
    let firecache = Firecache.getInstance();

    it("should successfully update a document in the firestore", async () => {
    });
});

describe("Delete a document from the Firestore", () => {
    let firecache = Firecache.getInstance();

    it("should successfully delete a document from the firestore", async () => {
    });
});