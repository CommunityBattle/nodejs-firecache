import Firestore from './firestore.js';
var Cache = /** @class */ (function () {
    function Cache() {
        this.firestore = Firestore.getInstance();
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
export { Cache };
export default Cache;
