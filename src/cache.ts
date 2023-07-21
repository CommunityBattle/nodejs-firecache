import Database from './database.js'
import { Q } from "./types.js"

class Cache{
    private static instance: Cache
    
    private database: Database

    private constructor(){
        this.database = Database.getInstance()
    }

    public static getInstance(): Cache {
        if (!this.instance){
            this.instance = new Cache()
        }

        return this.instance
    }

    public read(path: string, query?: Q): Promise<any> {
        return this.database.read(path, query)
    }
}

export { Cache }
export default Cache