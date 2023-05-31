declare class FirestoreError extends Error {
    constructor(msg: string);
}
declare class FirestoreNoDataError extends FirestoreError {
    constructor();
}
export { FirestoreNoDataError };
