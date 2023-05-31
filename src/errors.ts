class FirestoreError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, FirestoreError.prototype);
    }
}

class FirestoreNoDataError extends FirestoreError{
    constructor(){
        super('no data');
        Object.setPrototypeOf(this, FirestoreNoDataError.prototype);
    }
}

export {  FirestoreNoDataError }