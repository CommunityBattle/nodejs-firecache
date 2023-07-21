import { Q, ListenerEvent } from "./types.js";
declare class Listener {
    private static instance;
    private database;
    private constructor();
    static getInstance(): Listener;
    addListener(path: string, query: Q, callback: (event: ListenerEvent) => void, error: (err: Error) => void): void;
    deleteListener(path: string, query: Q, callback: (event: ListenerEvent) => void): void;
}
export { Listener };
export default Listener;
