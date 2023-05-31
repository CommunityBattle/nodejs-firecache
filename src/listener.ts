import Firestore from './firestore.js';
import Q from "./types.js";

class Listener{
    private static instance: Listener;
    
    private firestore: Firestore;

    private constructor(){
        this.firestore = Firestore.getInstance();
    }

    public static getInstance(): Listener {
        if (!this.instance){
            this.instance = new Listener();
        }

        return this.instance;
    }

    public addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void) {
        let unsubscribe = this.firestore.addListener(path, query, callback, error);
    }

    public deleteListener(path: string, query: Q, callback: (data: any) => void) {
        
    }
}

export { Listener }
export default Listener