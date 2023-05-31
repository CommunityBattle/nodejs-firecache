"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
var firestore_js_1 = __importDefault(require("./firestore.js"));
var Cache = /** @class */ (function () {
    function Cache() {
        this.firestore = firestore_js_1.default.getInstance();
    }
    Cache.getInstance = function () {
        if (!this.instance) {
            this.instance = new Cache();
        }
        return this.instance;
    };
    Cache.prototype.read = function (path, query) {
        return this.firestore.read(path, query);
    };
    Cache.prototype.insert = function (path, data) {
        return this.firestore.insert(path, data);
    };
    Cache.prototype.update = function (path, data) {
        return this.firestore.update(path, data);
    };
    return Cache;
}());
exports.Cache = Cache;
exports.default = Cache;
