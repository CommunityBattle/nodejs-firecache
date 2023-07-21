import { Q } from "./types.js";
declare class Database {
    private static instance;
    private firestore;
    private constructor();
    static getInstance(): Database;
    addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void): () => void;
    insert(path: string, data: any): Promise<string>;
    read(path: string, query?: Q): Promise<any>;
    update(path: string, data: any): Promise<void>;
    delete(path: string, query?: Q): Promise<void>;
    private isDoc;
    private resolve;
}
export { Database as Firestore };
export default Database;
