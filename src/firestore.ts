import { Firestore as GoogleCloudFirestore, CollectionReference, DocumentData, WhereFilterOp } from "@google-cloud/firestore";

import { FirestoreNoDataError } from "./errors.js";
import Q from "./types.js";

class Firestore{
    private static instance: Firestore;

    private googleCloudFirestore: GoogleCloudFirestore; 

    private constructor(){
        this.googleCloudFirestore = new GoogleCloudFirestore();
    }

    public static getInstance(): Firestore {
        if (!this.instance){
            this.instance = new Firestore();
        }

        return this.instance;
    }

    public addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void): () => void {
        if (this.isDoc(path)){
            return this.googleCloudFirestore.doc(path).onSnapshot(callback, error);
        }
        else{
            return this.resolve(path, query).onSnapshot(callback, error);
        }
    }

    public read(path: string, query?: Q): Promise<any> {
        if (this.isDoc(path)){
            return this.googleCloudFirestore.doc(path).get().then(doc => {
                if (doc.exists) {
                    return Promise.resolve(doc.data());
                }
                else {
                    return Promise.reject(new FirestoreNoDataError());
                }
            });
        }
        else{
            return this.googleCloudFirestore.collection(path).get().then(coll => {
                let data = [];

                for (const doc of coll.docs) {
                    data.push({id: doc.id,  data: doc.data()})
                }
                
                return Promise.resolve(data);
            });
        }
    }

    public insert(path: string, data: any): Promise<any> {
        return Promise.resolve();
    }

    public update(path: string, data: any): Promise<any> {
        return Promise.resolve();
    }

    public delete(path: string, query?: Q): Promise<any> {
        return Promise.resolve();
    }

    private isDoc(path: string): boolean {
        return (path.split("/").length % 2) == 0
    }

    private resolve(path: string, query: Q): CollectionReference<DocumentData> {
        let collection = this.googleCloudFirestore.collection(path);

        for (const condition of query) {
            collection.where(condition.field, (condition.operator as WhereFilterOp), condition.value)
        }

        return collection;
    }
}

export { Firestore, FirestoreNoDataError }
export default Firestore