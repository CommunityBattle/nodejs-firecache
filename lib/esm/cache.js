import Database from './database.js';
var Cache = /** @class */ (function () {
    function Cache() {
        this.database = Database.getInstance();
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
export { Cache };
export default Cache;
