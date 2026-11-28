import {
  getDocs,
  collection,
  doc,
  getDoc,
  where,
  query,
  orderBy,
  limit,
  startAfter,
  documentId,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { propertiesSchema, type Properties} from "../schema/propertiesSchema";
const PROPERTIES_COLLECTION = "propertyDrafts";
const PAGE_SIZE = 12;
export interface GetPropertiesParams {
  cursor?: QueryDocumentSnapshot<DocumentData> | null;
  pageSize?: number;
}
export interface GetPropertiesResponse {
  properties: Properties[];
  lastDocument: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

function parseProperty(
  id: string,
  data: DocumentData,
): Properties {
  const result =  propertiesSchema.safeParse({
    ...data,
    id,
  });
    if (!result.success) {
    console.error("PROPERTY VALIDATION FAILED:", {
      propertyId: id,
      errors: result.error.issues,
      firestoreData: data,
    });

    throw new Error(`Invalid property document: ${id}`);
  }

  return result.data;
}

export async function getProperties({
  cursor = null,
  pageSize = PAGE_SIZE,
}: GetPropertiesParams = {}): Promise<GetPropertiesResponse> {
  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 50) {
    throw new Error("Page size must be between 1 and 50.");
  }

  const constraints = [
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
    orderBy(documentId(), "desc"),
    ...(cursor ? [startAfter(cursor)] : []),
    limit(pageSize + 1),
  ];

  const propertiesQuery = query(
    collection(db, PROPERTIES_COLLECTION),
    ...constraints,
  );

  const snapshot = await getDocs(propertiesQuery);
  const hasMore = snapshot.docs.length > pageSize;
  const documents = snapshot.docs.slice(0, pageSize);
  const properties = documents.map((document) =>
    parseProperty(document.id, document.data()),
  );

  return {
    properties,
    lastDocument: documents.at(-1) ?? null,
    hasMore,
  };
}

export async function getPropertyById(
  propertyId: string,
): Promise<Properties | null> {
  if (!propertyId.trim()) {
    throw new Error("Property ID is required.");
  }

  const propertyRef = doc(
    db,
    PROPERTIES_COLLECTION,
    propertyId,
  );

  const snapshot = await getDoc(propertyRef);
   if (!snapshot.exists()) {
    return null;
  }

  const property = parseProperty(
    snapshot.id,
    snapshot.data(),
  );
  if (property.status !== "approved") {
    return null;
  }

  return property;
}