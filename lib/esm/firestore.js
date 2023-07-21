var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
        function rejected(value) { try { step(generator["throw"](value)) } catch (e) { reject(e) } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
}
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1] return t[1] }, trys: [], ops: [] }, f, y, t, g
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this }), g
    function verb(n) { return function (v) { return step([n, v]) } }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.")
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t
            if (y = 0, t) op = [op[0] & 2, t.value]
            switch (op[0]) {
                case 0: case 1: t = op break
                case 4: _.label++ return { value: op[1], done: false }
                case 5: _.label++ y = op[1] op = [0] continue
                case 7: op = _.ops.pop() _.trys.pop() continue
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0 continue }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1] break }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1] t = op break }
                    if (t && _.label < t[2]) { _.label = t[2] _.ops.push(op) break }
                    if (t[2]) _.ops.pop()
                    _.trys.pop() continue
            }
            op = body.call(thisArg, _)
        } catch (e) { op = [6, e] y = 0 } finally { f = t = 0 }
        if (op[0] & 5) throw op[1] return { value: op[0] ? op[1] : void 0, done: true }
    }
}
import { Firestore as GoogleCloudFirestore } from "@google-cloud/firestore"
import { NoData, AlreadyExists, CollectionUsedForDocumentOperation } from "./errors.js"
var Firestore = /** @class */ (function () {
    function Firestore() {
        this.googleCloudFirestore = new GoogleCloudFirestore()
    }
    Firestore.getInstance = function () {
        if (!this.instance) {
            this.instance = new Firestore()
        }
        return this.instance
    }
    Firestore.prototype.addListener = function (path, query, callback, error) {
        if (this.isDoc(path)) {
            return this.googleCloudFirestore.doc(path).onSnapshot(callback, error)
        }
        else {
            return this.resolve(path, query).onSnapshot(callback, error)
        }
    }
    Firestore.prototype.insert = function (path, data) {
        var _this = this
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var doc, doc
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isDoc(path)) return [3 /*break*/, 5]
                        return [4 /*yield*/, this.googleCloudFirestore.doc(path).get()]
                    case 1:
                        doc = _a.sent()
                        if (!doc.exists) return [3 /*break*/, 2]
                        return [2 /*return*/, reject(new AlreadyExists())]
                    case 2: return [4 /*yield*/, this.googleCloudFirestore.doc(path).create(data)]
                    case 3:
                        _a.sent()
                        return [2 /*return*/, resolve("")]
                    case 4: return [3 /*break*/, 7]
                    case 5: return [4 /*yield*/, this.googleCloudFirestore.collection(path).add(data)]
                    case 6:
                        doc = _a.sent()
                        resolve(doc.id)
                        _a.label = 7
                    case 7: return [2 /*return*/]
                }
            })
        }) })
    }
    Firestore.prototype.read = function (path, query) {
        var _this = this
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var doc, coll, data, _i, _a, doc
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isDoc(path)) return [3 /*break*/, 2]
                        return [4 /*yield*/, this.googleCloudFirestore.doc(path).get()]
                    case 1:
                        doc = _b.sent()
                        if (doc.exists) {
                            return [2 /*return*/, resolve(doc.data())]
                        }
                        else {
                            return [2 /*return*/, reject(new NoData())]
                        }
                        return [3 /*break*/, 4]
                    case 2: return [4 /*yield*/, this.resolve(path, query).get()]
                    case 3:
                        coll = _b.sent()
                        data = []
                        for (_i = 0, _a = coll.docs _i < _a.length _i++) {
                            doc = _a[_i]
                            data.push({ id: doc.id, data: doc.data() })
                        }
                        return [2 /*return*/, resolve(data)]
                    case 4: return [2 /*return*/]
                }
            })
        }) })
    }
    Firestore.prototype.update = function (path, data) {
        var _this = this
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var doc
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isDoc(path)) return [3 /*break*/, 5]
                        return [4 /*yield*/, this.googleCloudFirestore.doc(path).get()]
                    case 1:
                        doc = _a.sent()
                        if (!doc.exists) return [3 /*break*/, 3]
                        return [4 /*yield*/, this.googleCloudFirestore.doc(path).update(data)]
                    case 2:
                        _a.sent()
                        return [2 /*return*/, resolve()]
                    case 3: return [2 /*return*/, reject(new NoData())]
                    case 4: return [3 /*break*/, 6]
                    case 5: return [2 /*return*/, reject(new CollectionUsedForDocumentOperation())]
                    case 6: return [2 /*return*/]
                }
            })
        }) })
    }
    Firestore.prototype.delete = function (path, query) {
        var _this = this
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var doc, colls, _i, colls_1, coll, ref, _a, _b, d, coll, _c, _d, doc
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.isDoc(path)) return [3 /*break*/, 13]
                        return [4 /*yield*/, this.googleCloudFirestore.doc(path).get()]
                    case 1:
                        doc = _e.sent()
                        if (!doc.exists) return [3 /*break*/, 11]
                        return [4 /*yield*/, doc.ref.listCollections()]
                    case 2:
                        colls = _e.sent()
                        _i = 0, colls_1 = colls
                        _e.label = 3
                    case 3:
                        if (!(_i < colls_1.length)) return [3 /*break*/, 9]
                        coll = colls_1[_i]
                        return [4 /*yield*/, coll.get()]
                    case 4:
                        ref = _e.sent()
                        _a = 0, _b = ref.docs
                        _e.label = 5
                    case 5:
                        if (!(_a < _b.length)) return [3 /*break*/, 8]
                        d = _b[_a]
                        return [4 /*yield*/, this.delete("".concat(path, "/").concat(doc.id))]
                    case 6:
                        _e.sent()
                        _e.label = 7
                    case 7:
                        _a++
                        return [3 /*break*/, 5]
                    case 8:
                        _i++
                        return [3 /*break*/, 3]
                    case 9: return [4 /*yield*/, doc.ref.delete()]
                    case 10:
                        _e.sent()
                        return [2 /*return*/, resolve()]
                    case 11: return [2 /*return*/, reject(new NoData())]
                    case 12: return [3 /*break*/, 19]
                    case 13: return [4 /*yield*/, this.resolve(path, query).get()]
                    case 14:
                        coll = _e.sent()
                        _c = 0, _d = coll.docs
                        _e.label = 15
                    case 15:
                        if (!(_c < _d.length)) return [3 /*break*/, 18]
                        doc = _d[_c]
                        return [4 /*yield*/, this.delete("".concat(path, "/").concat(doc.id))]
                    case 16:
                        _e.sent()
                        _e.label = 17
                    case 17:
                        _c++
                        return [3 /*break*/, 15]
                    case 18: return [2 /*return*/, resolve()]
                    case 19: return [2 /*return*/]
                }
            })
        }) })
    }
    Firestore.prototype.isDoc = function (path) {
        return (path.split("/").length % 2) == 0
    }
    Firestore.prototype.resolve = function (path, query) {
        var collectionRef = this.googleCloudFirestore.collection(path)
        var queryRef = collectionRef
        if (query) {
            for (var _i = 0, query_1 = query _i < query_1.length _i++) {
                var condition = query_1[_i]
                queryRef = queryRef.where(condition.field, condition.operator, condition.value)
                if (condition.order) {
                    for (var _a = 0, _b = condition.order _a < _b.length _a++) {
                        var order = _b[_a]
                        queryRef = queryRef.orderBy(order.by, order.direction)
                    }
                }
                if (condition.limit) {
                    queryRef = queryRef.limit(condition.limit)
                }
            }
        }
        return queryRef
    }
    return Firestore
}())
export { Firestore }
export default Firestore
