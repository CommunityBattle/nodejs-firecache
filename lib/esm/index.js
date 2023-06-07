import Firestore from "@google-cloud/firestore";
import { Firecache } from './firecache.js';
import { NoData, AlreadyExists, CollectionUsedForDocumentOperation } from "./errors.js";
export { Firestore }; // Pipe forward standard functionality
export { NoData, // Export error types
AlreadyExists, CollectionUsedForDocumentOperation };
export { Firecache }; // Export the main lib
export default Firecache;
