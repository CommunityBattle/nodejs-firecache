import Q from "./types.js";
declare class Listener {
    private static instance;
    private firestore;
    private constructor();
    static getInstance(): Listener;
    addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void): void;
    deleteListener(path: string, query: Q, callback: (data: any) => void): void;
}
export { Listener };
export default Listener;
