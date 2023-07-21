import { Firestore, DocumentData, WhereFilterOp, OrderByDirection, Query } from "@google-cloud/firestore"

import { NoData, AlreadyExists, CollectionUsedForDocumentOperation } from "./errors.js"
import { Q } from "./types.js"
import { isDoc } from "./common.js"

class Database {
    private static instance: Database

    private firestore: Firestore

    private constructor() {
        this.firestore = new Firestore()
    }

    public static getInstance(): Database {
        if (!this.instance) {
            this.instance = new Database()
        }

        return this.instance
    }

    public addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void): () => void {
        if (isDoc(path)) {
            return this.firestore.doc(path).onSnapshot(callback, error)
        }
        else {
            return this.resolve(path, query).onSnapshot(callback, error)
        }
    }

    public insert(path: string, data: any): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (isDoc(path)) {
                let doc = await this.firestore.doc(path).get()
                if (doc.exists) {
                    return reject(new AlreadyExists())
                }
                else {
                    await this.firestore.doc(path).create(data)
                    return resolve("")
                }
            }
            else {
                let doc = await this.firestore.collection(path).add(data)
                resolve(doc.id)
            }
        })
    }

    public read(path: string, query?: Q): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (isDoc(path)) {
                let doc = await this.firestore.doc(path).get()

                if (doc.exists) {
                    return resolve(doc.data())
                }
                else {
                    return reject(new NoData())
                }
            }
            else {
                let coll = await this.resolve(path, query).get()

                let data = []

                for (const doc of coll.docs) {
                    data.push({ id: doc.id, data: doc.data() })
                }

                return resolve(data)
            }
        })
    }

    public update(path: string, data: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (isDoc(path)) {
                let doc = await this.firestore.doc(path).get()

                if (doc.exists) {
                    await this.firestore.doc(path).update(data)
                    return resolve()
                }
                else {
                    return reject(new NoData())
                }
            }
            else {
                return reject(new CollectionUsedForDocumentOperation())
            }
        })
    }

    public delete(path: string, query?: Q): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (isDoc(path)) {
                let doc = await this.firestore.doc(path).get()

                if (doc.exists) {
                    let colls = await doc.ref.listCollections()

                    for (const coll of colls) {
                        let ref = await coll.get()

                        for (const d of ref.docs) {
                            await this.delete(`${path}/${doc.id}`)
                        }
                    }

                    await doc.ref.delete()
                    return resolve()
                }
                else {
                    return reject(new NoData())
                }
            }
            else {
                let coll = await this.resolve(path, query).get()

                for (const doc of coll.docs) {
                    await this.delete(`${path}/${doc.id}`)
                }

                return resolve()
            }
        })
    }

    private resolve(path: string, query?: Q): Query<DocumentData> {
        let collectionRef = this.firestore.collection(path)
        let queryRef: Query<DocumentData> = collectionRef

        if (query) {
            for (const condition of query) {
                queryRef = queryRef.where(condition.field, (condition.operator as WhereFilterOp), condition.value)

                if (condition.order) {
                    for (const order of condition.order) {
                        queryRef = queryRef.orderBy(order.by, (order.direction as OrderByDirection))
                    }
                }

                if (condition.offset) {
                    queryRef = queryRef.offset(condition.offset)
                }

                if (condition.limit) {
                    queryRef = queryRef.limit(condition.limit)
                }
            }
        }

        return queryRef
    }
}

export { Database as Firestore }
export default Database