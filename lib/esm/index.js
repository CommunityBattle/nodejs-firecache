import Firestore from "@google-cloud/firestore";
import { Firecache } from './firecache.js';
import { FirestoreNoDataError } from "./errors.js";
export { Firestore }; // Pipe forward standard functionality
export { FirestoreNoDataError }; // Export error types
export { Firecache }; // Export the main lib
export default Firecache;
