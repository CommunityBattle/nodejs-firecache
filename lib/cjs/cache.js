"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
var database_js_1 = __importDefault(require("./database.js"));
var Cache = /** @class */ (function () {
    function Cache() {
        this.database = database_js_1.default.getInstance();
    }
    Cache.getInstance = function () {
        if (!this.instance) {
            this.instance = new Cache();
        }
        return this.instance;
    };
    Cache.prototype.read = function (path, query) {
        return this.database.read(path, query);
    };
    return Cache;
}());
exports.Cache = Cache;
exports.default = Cache;
