import Firestore from './firestore.js';
import Listener from './listener.js';
import Cache from './cache.js';

import Q from './types.js'

class Firecache{
    private static instance: Firecache;

    private firestore: Firestore;
    private listener: Listener;
    private cache: Cache;

    private constructor(){
        this.firestore = Firestore.getInstance();
        this.listener = Listener.getInstance();
        this.cache = Cache.getInstance();
    }

    public static getInstance(): Firecache {
        if (!this.instance){
            this.instance = new Firecache();
        }

        return this.instance;
    }

    public addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void) {
        this.listener.addListener(path, query, callback, error);
    }

    public deleteListener(path: string, query: Q, callback: (data: any) => void) {
        this.listener.deleteListener(path, query, callback);
    }

    public read(path: string, query?: Q, byPassCache?: boolean): Promise<any> {
        if (byPassCache){
            return this.firestore.read(path, query);
        }
        return this.cache.read(path, query);
    }

    public insert(path: string, data: any, byPassCache?: boolean): Promise<any> {
        if (byPassCache){
            return this.firestore.insert(path, data);
        }
        return this.cache.insert(path, data);
    }

    public update(path: string, data: any, byPassCache?: boolean): Promise<any> {
        if (byPassCache){
            return this.firestore.update(path, data);
        }
        return this.cache.update(path, data);
    }

    public delete(path: string, query?: Q): Promise<any> {
        return this.firestore.delete(path, query);
    }
}

export { Firecache }
export default Firecache