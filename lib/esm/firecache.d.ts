import { Q, ListenerEvent } from './types.js';
declare class Firecache {
    private static instance;
    private database;
    private listener;
    private cache;
    private constructor();
    static getInstance(): Firecache;
    addListener(path: string, query: Q, callback: (event: ListenerEvent) => void, error: (err: Error) => void): void;
    deleteListener(path: string, query: Q, callback: (event: ListenerEvent) => void): void;
    read(path: string, query?: Q, byPassCache?: boolean): Promise<any>;
    insert(path: string, data: any): Promise<any>;
    update(path: string, data: any): Promise<any>;
    delete(path: string, query?: Q): Promise<any>;
    monitor(): void;
}
export { Firecache };
export default Firecache;
