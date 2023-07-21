import { OrderByDirection, DocumentChangeType } from "@google-cloud/firestore"

type Direction = OrderByDirection
type ChangeType = DocumentChangeType

type Order = {
	by: string
	direction: string
}

type O = Order[]

type Query = {
	field: string
	operator: string
	value: string
	order: O
	offset: number
	limit: number
}

type Q = Query[]

type Document = Map<string, any>
type DocumentEntry = {
	id: string
	document: Document
}
type DocumentList = DocumentEntry[]

type DocumentChangeEntry = {
	id: string
	document: Document
	type: ChangeType
	oldIndex: number
	newIndex: number
}
type DocumentChangeList = DocumentChangeEntry[]

type ListenerEvent = {
	document: Document
	documentList: DocumentList
	documentChangeList: DocumentChangeList
}

export { Direction, ChangeType }
export { Query, Q, Order, O }
export { Document, DocumentEntry, DocumentList, DocumentChangeEntry, DocumentChangeList, ListenerEvent }