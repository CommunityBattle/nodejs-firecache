import { Q } from './types.js'

function parseKey(path: string, query: Q): string {
    let key = path

    if (query) {
        for (const condition of query) {
            key += `:${condition.field}|${condition.operator}|${condition.value}`

            if (condition.order) {
                for (const order of condition.order) {
                    key += `|${order.by}|${order.direction}`
                }
            }

            if (condition.offset) {
                key += `|${condition.offset}`
            }

            if (condition.limit) {
                key += `|${condition.limit}`
            }
        }
    }
    
    return key
}

function isDoc(path: string): boolean {
    return (path.split("/").length % 2) == 0
}

function parseDocIdFromPath(path: string): string {
    let hierarchy = path.split("/") 
    return hierarchy[hierarchy.length - 1 ]
}

export { parseKey, isDoc, parseDocIdFromPath }