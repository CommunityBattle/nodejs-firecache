import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { Firecache, NoData, CollectionUsedForDocumentOperation, AlreadyExists } from '../lib/esm/index';

let firecache = Firecache.getInstance();

let testCollection = 'test-' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

let testDoc = "test_doc";
let testDocNotExisting = "test_doc_not_existing";

let testData = { test_field: "test_value" };
let testDataUpdated = { test_field: "test_value_updated" };

describe("Insert a document to the Firestore", async () => {
    it("should successfully insert a document to a given collection", async () => {
        let id = await firecache.insert(testCollection, testData);
        assert.notStrictEqual("", id);
    });

    it("should successfully insert a document into the firestore", async () => {
        await firecache.insert(`${testCollection}/${testDoc}`, testData);
        let data = await firecache.read(`${testCollection}/${testDoc}`);
        assert.deepEqual(data, testData);
    });

    it("should fail inserting another document with the same name into the firestore", async () => {
        try {
            await firecache.insert(`${testCollection}/${testDoc}`, testData);
            assert.fail("document was not rejected by the method");
        } catch (err) {
            assert.deepEqual(err, new AlreadyExists());
        }
    });
});

describe("Read a document from the Firestore", async () => {
    it("should fail while reading a not existing document from the firestore", async () => {
        try {
            await firecache.read(`${testCollection}/${testDocNotExisting}`);
            assert.fail("document was found by the method");
        } catch (err) {
            assert.deepEqual(err, new NoData());
        }
    });

    it("should successfully read a document from the firestore", async () => {
        let data = await firecache.read(`${testCollection}/${testDoc}`);
        assert.deepEqual(data, testData);
    });
});

describe("Update a document in the Firestore", async () => {
    it("should fail updating a not existing document in the firestore", async () => {
        try {
            await firecache.update(`${testCollection}/${testDocNotExisting}`, testDataUpdated);
            assert.fail("document was not rejected by the method");
        } catch (err) {
            assert.deepEqual(err, new NoData());
        }
    });

    it("should fail passing a collection path to the update method", async () => {
        try {
            await firecache.update(`${testCollection}`, testDataUpdated);
            assert.fail("collection path was not rejected by the method");
        } catch (err) {
            assert.deepEqual(err, new CollectionUsedForDocumentOperation());
        }
    });

    it("should successfully update a document in the firestore", async () => {
        await firecache.update(`${testCollection}/${testDoc}`, testDataUpdated);
        let data = await firecache.read(`${testCollection}/${testDoc}`);
        assert.deepEqual(data, testDataUpdated);
    });
});

describe("Delete a document from the Firestore", async () => {
    it("should fail deleting a document that does not exists", async () => {
        try {
            await firecache.delete(`${testCollection}/${testDocNotExisting}`);
            assert.fail("document was deletable in the method");
        } catch (err) {
            assert.deepEqual(err, new NoData());
        }
    });

    it("should successfully delete a document from the firestore", async () => {
        await firecache.delete(`${testCollection}/${testDoc}`);

        try {
            await firecache.read(`${testCollection}/${testDoc}`);
            assert.fail("document was found by the method");
        } catch (err) {
            assert.deepEqual(err, new NoData());
        }
    });

    it("should successfully delete a collection", async () => {
        await firecache.delete(testCollection);

        let docs = await firecache.read(testCollection);
        assert.strictEqual(docs.length, 0);
    });
});