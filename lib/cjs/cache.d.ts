import { Q } from "./types.js";
declare class Cache {
    private static instance;
    private database;
    private constructor();
    static getInstance(): Cache;
    read(path: string, query?: Q): Promise<any>;
}
export { Cache };
export default Cache;
