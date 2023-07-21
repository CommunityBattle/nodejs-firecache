import Database from './database.js'
import Listener from './listener.js'
import Cache from './cache.js'

import { Q, ListenerEvent } from './types.js'

class Firecache{
    private static instance: Firecache

    private database: Database
    private listener: Listener
    private cache: Cache

    private constructor(){
        this.database = Database.getInstance()
        this.listener = Listener.getInstance()
        this.cache = Cache.getInstance()
    }

    public static getInstance(): Firecache {
        if (!this.instance){
            this.instance = new Firecache()
        }

        return this.instance
    }

    public addListener(path: string, query: Q, callback: (event: ListenerEvent) => void, error: (err: Error) => void) {
        this.listener.addListener(path, query, callback, error)
    }

    public deleteListener(path: string, query: Q, callback: (event: ListenerEvent) => void) {
        this.listener.deleteListener(path, query, callback)
    }

    public read(path: string, query?: Q, bypassCache?: boolean): Promise<any> {
        if (bypassCache){
            return this.database.read(path, query)
        }
        return this.cache.read(path, query)
    }

    public insert(path: string, data: any): Promise<any> {
        return this.database.insert(path, data)
    }

    public update(path: string, data: any): Promise<any> {
        return this.database.update(path, data)
    }

    public delete(path: string, query?: Q): Promise<any> {
        return this.database.delete(path, query)
    }

    public monitor(): void {
        console.log("--------------------------------------------------Firecache Monitor--------------------------------------------------")
        console.log()
        console.log("Currently active firecache caches:")
        // for (const key in this.cache.cache) {
        //     console.log("\t", key+":", this.cache.cache[key])
        // }
        console.log()
        console.log("Currently active firecache listeners:")
        // for (const key in this.listener.cache) {
        //     console.log("\t", key+":", this.listener.cache[key])
        // }
        console.log("--------------------------------------------------Firecache Monitor--------------------------------------------------")
    }
}

export { Firecache }
export default Firecache