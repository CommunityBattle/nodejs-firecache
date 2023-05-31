"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreNoDataError = exports.Firestore = void 0;
var firestore_1 = require("@google-cloud/firestore");
var errors_js_1 = require("./errors.js");
Object.defineProperty(exports, "FirestoreNoDataError", { enumerable: true, get: function () { return errors_js_1.FirestoreNoDataError; } });
var Firestore = /** @class */ (function () {
    function Firestore() {
        this.googleCloudFirestore = new firestore_1.Firestore();
    }
    Firestore.getInstance = function () {
        if (!this.instance) {
            this.instance = new Firestore();
        }
        return this.instance;
    };
    Firestore.prototype.addListener = function (path, query, callback, error) {
        if (this.isDoc(path)) {
            return this.googleCloudFirestore.doc(path).onSnapshot(callback, error);
        }
        else {
            return this.resolve(path, query).onSnapshot(callback, error);
        }
    };
    Firestore.prototype.read = function (path, query) {
        if (this.isDoc(path)) {
            return this.googleCloudFirestore.doc(path).get().then(function (doc) {
                if (doc.exists) {
                    return Promise.resolve(doc.data());
                }
                else {
                    return Promise.reject(new errors_js_1.FirestoreNoDataError());
                }
            });
        }
        else {
            return this.googleCloudFirestore.collection(path).get().then(function (coll) {
                var data = [];
                for (var _i = 0, _a = coll.docs; _i < _a.length; _i++) {
                    var doc = _a[_i];
                    data.push({ id: doc.id, data: doc.data() });
                }
                return Promise.resolve(data);
            });
        }
    };
    Firestore.prototype.insert = function (path, data) {
        return Promise.resolve();
    };
    Firestore.prototype.update = function (path, data) {
        return Promise.resolve();
    };
    Firestore.prototype.delete = function (path, query) {
        return Promise.resolve();
    };
    Firestore.prototype.isDoc = function (path) {
        return (path.split("/").length % 2) == 0;
    };
    Firestore.prototype.resolve = function (path, query) {
        var collection = this.googleCloudFirestore.collection(path);
        for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
            var condition = query_1[_i];
            collection.where(condition.field, condition.operator, condition.value);
        }
        return collection;
    };
    return Firestore;
}());
exports.Firestore = Firestore;
exports.default = Firestore;
