import Database from './database.js'
import { Q, ListenerEvent } from "./types.js"

class Listener{
    private static instance: Listener
    
    private database: Database

    private constructor(){
        this.database = Database.getInstance()
    }

    public static getInstance(): Listener {
        if (!this.instance){
            this.instance = new Listener()
        }

        return this.instance
    }

    public addListener(path: string, query: Q, callback: (event: ListenerEvent) => void, error: (err: Error) => void) {
        let unsubscribe = this.database.addListener(path, query, callback, error)
    }

    public deleteListener(path: string, query: Q, callback: (event: ListenerEvent) => void) {
        
    }
}

export { Listener }
export default Listener