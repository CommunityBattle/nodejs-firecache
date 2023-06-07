import Firestore from "@google-cloud/firestore";
import { Firecache } from './firecache.js';
import { NoData, AlreadyExists, CollectionUsedForDocumentOperation } from "./errors.js";
import { Q, Query, O, Order } from "./types.js";

export { Firestore };               // Pipe forward standard functionality
export { Q, Query, O, Order };      // Export utility types
export { NoData,                    // Export error types
         AlreadyExists,
         CollectionUsedForDocumentOperation };    
export { Firecache };               // Export the main lib
export default Firecache;