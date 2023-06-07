import Firestore from "@google-cloud/firestore";
import { Firecache } from './firecache.js';
import { NoData, AlreadyExists, CollectionUsedForDocumentOperation } from "./errors.js";
import { Q, Query, O, Order } from "./types.js";
export { Firestore };
export { Q, Query, O, Order };
export { NoData, // Export error types
AlreadyExists, CollectionUsedForDocumentOperation };
export { Firecache };
export default Firecache;
