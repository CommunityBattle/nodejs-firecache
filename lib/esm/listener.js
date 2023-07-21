import Database from './database.js';
var Listener = /** @class */ (function () {
    function Listener() {
        this.database = Database.getInstance();
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
export { Listener };
export default Listener;
