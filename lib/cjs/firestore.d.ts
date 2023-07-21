import Q from "./types.js"
declare class Firestore {
    private static instance
    private googleCloudFirestore
    private constructor()
    static getInstance(): Firestore
    addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void): () => void
    insert(path: string, data: any): Promise<string>
    read(path: string, query?: Q): Promise<any>
    update(path: string, data: any): Promise<void>
    delete(path: string, query?: Q): Promise<void>
    private isDoc
    private resolve
}
export { Firestore }
export default Firestore
