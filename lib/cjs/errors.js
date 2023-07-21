"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionUsedForDocumentOperation = exports.AlreadyExists = exports.NoData = void 0;
var FirestoreError = /** @class */ (function (_super) {
    __extends(FirestoreError, _super);
    function FirestoreError(msg) {
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, FirestoreError.prototype);
        return _this;
    }
    return FirestoreError;
}(Error));
var NoData = /** @class */ (function (_super) {
    __extends(NoData, _super);
    function NoData() {
        var _this = _super.call(this, 'no data') || this;
        Object.setPrototypeOf(_this, NoData.prototype);
        return _this;
    }
    return NoData;
}(FirestoreError));
exports.NoData = NoData;
var AlreadyExists = /** @class */ (function (_super) {
    __extends(AlreadyExists, _super);
    function AlreadyExists() {
        var _this = _super.call(this, 'already exists') || this;
        Object.setPrototypeOf(_this, AlreadyExists.prototype);
        return _this;
    }
    return AlreadyExists;
}(FirestoreError));
exports.AlreadyExists = AlreadyExists;
var CollectionUsedForDocumentOperation = /** @class */ (function (_super) {
    __extends(CollectionUsedForDocumentOperation, _super);
    function CollectionUsedForDocumentOperation() {
        var _this = _super.call(this, 'collection used for document operation') || this;
        Object.setPrototypeOf(_this, CollectionUsedForDocumentOperation.prototype);
        return _this;
    }
    return CollectionUsedForDocumentOperation;
}(FirestoreError));
exports.CollectionUsedForDocumentOperation = CollectionUsedForDocumentOperation;
