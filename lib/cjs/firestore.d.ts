import { FirestoreNoDataError } from "./errors.js";
import Q from "./types.js";
declare class Firestore {
    private static instance;
    private googleCloudFirestore;
    private constructor();
    static getInstance(): Firestore;
    addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void): () => void;
    read(path: string, query?: Q): Promise<any>;
    insert(path: string, data: any): Promise<any>;
    update(path: string, data: any): Promise<any>;
    delete(path: string, query?: Q): Promise<any>;
    private isDoc;
    private resolve;
}
export { Firestore, FirestoreNoDataError };
export default Firestore;
