import { Firestore as GoogleCloudFirestore, CollectionReference, DocumentData, WhereFilterOp, OrderByDirection, QueryPartition, Query } from "@google-cloud/firestore";

import { NoData, AlreadyExists, CollectionUsedForDocumentOperation } from "./errors.js";
import Q from "./types.js";

class Firestore {
    private static instance: Firestore;

    private googleCloudFirestore: GoogleCloudFirestore;

    private constructor() {
        this.googleCloudFirestore = new GoogleCloudFirestore();
    }

    public static getInstance(): Firestore {
        if (!this.instance) {
            this.instance = new Firestore();
        }

        return this.instance;
    }

    public addListener(path: string, query: Q, callback: (data: any) => void, error: (err: Error) => void): () => void {
        if (this.isDoc(path)) {
            return this.googleCloudFirestore.doc(path).onSnapshot(callback, error);
        }
        else {
            return this.resolve(path, query).onSnapshot(callback, error);
        }
    }

    public insert(path: string, data: any): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (this.isDoc(path)) {
                let doc = await this.googleCloudFirestore.doc(path).get();
                if (doc.exists) {
                    return reject(new AlreadyExists());
                }
                else {
                    await this.googleCloudFirestore.doc(path).create(data);
                    return resolve("");
                }
            }
            else {
                let doc = await this.googleCloudFirestore.collection(path).add(data);
                resolve(doc.id)
            }
        });
    }

    public read(path: string, query?: Q): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this.isDoc(path)) {
                let doc = await this.googleCloudFirestore.doc(path).get();

                if (doc.exists) {
                    return resolve(doc.data());
                }
                else {
                    return reject(new NoData());
                }
            }
            else {
                let coll = await this.resolve(path, query).get();

                let data = [];

                for (const doc of coll.docs) {
                    data.push({ id: doc.id, data: doc.data() })
                }

                return resolve(data);
            }
        });
    }

    public update(path: string, data: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (this.isDoc(path)) {
                let doc = await this.googleCloudFirestore.doc(path).get();

                if (doc.exists) {
                    await this.googleCloudFirestore.doc(path).update(data);
                    return resolve();
                }
                else {
                    return reject(new NoData());
                }
            }
            else {
                return reject(new CollectionUsedForDocumentOperation());
            }
        });
    }

    public delete(path: string, query?: Q): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (this.isDoc(path)) {
                let doc = await this.googleCloudFirestore.doc(path).get();

                if (doc.exists) {
                    let colls = await doc.ref.listCollections();

                    for (const coll of colls) {
                        let ref = await coll.get();

                        for (const d of ref.docs) {
                            await this.delete(`${path}/${doc.id}`);
                        }
                    }

                    await doc.ref.delete();
                    return resolve();
                }
                else {
                    return reject(new NoData());
                }
            }
            else {
                let coll = await this.resolve(path, query).get();

                for (const doc of coll.docs) {
                    await this.delete(`${path}/${doc.id}`);
                }

                return resolve();
            }
        });
    }

    private isDoc(path: string): boolean {
        return (path.split("/").length % 2) == 0
    }

    private resolve(path: string, query?: Q): Query<DocumentData> {
        let collectionRef = this.googleCloudFirestore.collection(path);
        let queryRef: Query<DocumentData> = collectionRef;

        if (query) {
            for (const condition of query) {
                queryRef = queryRef.where(condition.field, (condition.operator as WhereFilterOp), condition.value);

                if (condition.order) {
                    for (const order of condition.order) {
                        queryRef = queryRef.orderBy(order.by, (order.direction as OrderByDirection));
                    }
                }

                if (condition.limit) {
                    queryRef = queryRef.limit(condition.limit);
                }
            }
        }

        return queryRef;
    }
}

export { Firestore }
export default Firestore