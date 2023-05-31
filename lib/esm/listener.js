import Firestore from './firestore.js';
var Listener = /** @class */ (function () {
    function Listener() {
        this.firestore = Firestore.getInstance();
    }
    Listener.getInstance = function () {
        if (!this.instance) {
            this.instance = new Listener();
        }
        return this.instance;
    };
    Listener.prototype.addListener = function (path, query, callback, error) {
        var unsubscribe = this.firestore.addListener(path, query, callback, error);
    };
    Listener.prototype.deleteListener = function (path, query, callback) {
    };
    return Listener;
}());
export { Listener };
export default Listener;
