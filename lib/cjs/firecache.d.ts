import Q from './types.js';
declare class Firecache {
    private static instance;
    private firestore;
    private listener;
    private cache;
    private constructor();
    static getInstance(): Firecache;
    addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void): void;
    deleteListener(path: string, query: Q, callback: (data: any) => void): void;
    read(path: string, query?: Q, byPassCache?: boolean): Promise<any>;
    insert(path: string, data: any, byPassCache?: boolean): Promise<any>;
    update(path: string, data: any, byPassCache?: boolean): Promise<any>;
    delete(path: string, query?: Q): Promise<any>;
}
export { Firecache };
export default Firecache;
