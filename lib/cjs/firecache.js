"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firecache = void 0;
var database_js_1 = __importDefault(require("./database.js"));
var listener_js_1 = __importDefault(require("./listener.js"));
var cache_js_1 = __importDefault(require("./cache.js"));
var Firecache = /** @class */ (function () {
    function Firecache() {
        this.database = database_js_1.default.getInstance();
        this.listener = listener_js_1.default.getInstance();
        this.cache = cache_js_1.default.getInstance();
    }
    Firecache.getInstance = function () {
        if (!this.instance) {
            this.instance = new Firecache();
        }
        return this.instance;
    };
    Firecache.prototype.addListener = function (path, query, callback, error) {
        this.listener.addListener(path, query, callback, error);
    };
    Firecache.prototype.deleteListener = function (path, query, callback) {
        this.listener.deleteListener(path, query, callback);
    };
    Firecache.prototype.read = function (path, query, byPassCache) {
        if (byPassCache) {
            return this.database.read(path, query);
        }
        return this.cache.read(path, query);
    };
    Firecache.prototype.insert = function (path, data) {
        return this.database.insert(path, data);
    };
    Firecache.prototype.update = function (path, data) {
        return this.database.update(path, data);
    };
    Firecache.prototype.delete = function (path, query) {
        return this.database.delete(path, query);
    };
    Firecache.prototype.monitor = function () {
        console.log("--------------------------------------------------Firecache Monitor--------------------------------------------------");
        console.log();
        console.log("Currently active firecache caches:");
        // for (const key in this.cache.cache) {
        //     console.log("\t", key+":", this.cache.cache[key])
        // }
        console.log();
        console.log("Currently active firecache listeners:");
        // for (const key in this.listener.cache) {
        //     console.log("\t", key+":", this.listener.cache[key])
        // }
        console.log("--------------------------------------------------Firecache Monitor--------------------------------------------------");
    };
    return Firecache;
}());
exports.Firecache = Firecache;
exports.default = Firecache;
