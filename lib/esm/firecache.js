import Firestore from './firestore.js';
import Listener from './listener.js';
import Cache from './cache.js';
var Firecache = /** @class */ (function () {
    function Firecache() {
        this.firestore = Firestore.getInstance();
        this.listener = Listener.getInstance();
        this.cache = Cache.getInstance();
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
            return this.firestore.read(path, query);
        }
        return this.cache.read(path, query);
    };
    Firecache.prototype.insert = function (path, data, byPassCache) {
        if (byPassCache) {
            return this.firestore.insert(path, data);
        }
        return this.cache.insert(path, data);
    };
    Firecache.prototype.update = function (path, data, byPassCache) {
        if (byPassCache) {
            return this.firestore.update(path, data);
        }
        return this.cache.update(path, data);
    };
    Firecache.prototype.delete = function (path, query) {
        return this.firestore.delete(path, query);
    };
    return Firecache;
}());
export { Firecache };
export default Firecache;
