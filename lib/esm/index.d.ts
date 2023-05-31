import Firestore from "@google-cloud/firestore";
import { Firecache } from './firecache.js';
import { FirestoreNoDataError } from "./errors.js";
import { Q, Query, O, Order } from "./types.js";
export { Firestore };
export { Q, Query, O, Order };
export { FirestoreNoDataError };
export { Firecache };
export default Firecache;
