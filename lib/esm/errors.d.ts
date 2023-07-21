declare class FirestoreError extends Error {
    constructor(msg: string);
}
declare class NoData extends FirestoreError {
    constructor();
}
declare class AlreadyExists extends FirestoreError {
    constructor();
}
declare class CollectionUsedForDocumentOperation extends FirestoreError {
    constructor();
}
export { NoData, AlreadyExists, CollectionUsedForDocumentOperation };
