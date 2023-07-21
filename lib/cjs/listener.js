"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
var database_js_1 = __importDefault(require("./database.js"));
var Listener = /** @class */ (function () {
    function Listener() {
        this.database = database_js_1.default.getInstance();
    }
    Listener.getInstance = function () {
        if (!this.instance) {
            this.instance = new Listener();
        }
        return this.instance;
    };
    Listener.prototype.addListener = function (path, query, callback, error) {
        var unsubscribe = this.database.addListener(path, query, callback, error);
    };
    Listener.prototype.deleteListener = function (path, query, callback) {
    };
    return Listener;
}());
exports.Listener = Listener;
exports.default = Listener;
