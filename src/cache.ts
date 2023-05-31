import Firestore from './firestore.js';
import Q from "./types.js";

class Cache{
    private static instance: Cache;
    
    private firestore: Firestore;

    private constructor(){
        this.firestore = Firestore.getInstance();
    }

    public static getInstance(): Cache {
        if (!this.instance){
            this.instance = new Cache();
        }

        return this.instance;
    }

    public read(path: string, query?: Q): Promise<any> {
        return this.firestore.read(path, query);
    }

    public insert(path: string, data: any): Promise<any> {
        return this.firestore.insert(path, data);
    }

    public update(path: string, data: any): Promise<any> {
        return this.firestore.update(path, data);
    }
}

export { Cache }
export default Cache