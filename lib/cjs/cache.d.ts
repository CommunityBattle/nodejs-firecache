import Q from "./types.js";
declare class Cache {
    private static instance;
    private firestore;
    private constructor();
    static getInstance(): Cache;
    read(path: string, query?: Q): Promise<any>;
    insert(path: string, data: any): Promise<any>;
    update(path: string, data: any): Promise<any>;
}
export { Cache };
export default Cache;
