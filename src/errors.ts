class FirestoreError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, FirestoreError.prototype)
    }
}

class NoData extends FirestoreError{
    constructor(){
        super('no data')
        Object.setPrototypeOf(this, NoData.prototype)
    }
}

class AlreadyExists extends FirestoreError{
    constructor(){
        super('already exists')
        Object.setPrototypeOf(this, AlreadyExists.prototype)
    }
}

class CollectionUsedForDocumentOperation extends FirestoreError{
    constructor(){
        super('collection used for document operation')
        Object.setPrototypeOf(this, CollectionUsedForDocumentOperation.prototype)
    }
}

export {  NoData, AlreadyExists, CollectionUsedForDocumentOperation }