import Firestore from "@google-cloud/firestore";
import { Firecache } from './firecache.js';
import { FirestoreNoDataError } from "./errors.js";
import { Q, Query, O, Order } from "./types.js";

export { Firestore };               // Pipe forward standard functionality
export { Q, Query, O, Order };      // Export utility types
export { FirestoreNoDataError };    // Export error types
export { Firecache };               // Export the main lib
export default Firecache;