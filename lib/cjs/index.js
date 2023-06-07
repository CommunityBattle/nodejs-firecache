"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firecache = exports.CollectionUsedForDocumentOperation = exports.AlreadyExists = exports.NoData = exports.Firestore = void 0;
var firestore_1 = __importDefault(require("@google-cloud/firestore"));
exports.Firestore = firestore_1.default;
var firecache_js_1 = require("./firecache.js");
Object.defineProperty(exports, "Firecache", { enumerable: true, get: function () { return firecache_js_1.Firecache; } });
var errors_js_1 = require("./errors.js");
Object.defineProperty(exports, "NoData", { enumerable: true, get: function () { return errors_js_1.NoData; } });
Object.defineProperty(exports, "AlreadyExists", { enumerable: true, get: function () { return errors_js_1.AlreadyExists; } });
Object.defineProperty(exports, "CollectionUsedForDocumentOperation", { enumerable: true, get: function () { return errors_js_1.CollectionUsedForDocumentOperation; } });
exports.default = firecache_js_1.Firecache;
