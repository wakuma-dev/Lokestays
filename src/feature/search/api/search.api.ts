import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

export interface PropertyListing {
  id: string;
  title?: string;
  city?: string;
  description?: string;
  price?: number;
  bedrooms?: number;
  photos: string[];
}

interface SearchPropertiesParams {
  destination?: string;
  cursor?: QueryDocumentSnapshot<DocumentData>;
}

export interface PropertySearchPage {
  properties: PropertyListing[];
  nextCursor?: QueryDocumentSnapshot<DocumentData>;
}

const PAGE_SIZE = 24;

function asText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function asPhotos(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((photo): photo is string => typeof photo === "string")
    : [];
}

export async function searchProperties({
  destination,
  cursor,
}: SearchPropertiesParams = {}): Promise<PropertySearchPage> {
  const constraints: QueryConstraint[] = [where("status", "==", "approved")];
  const normalizedDestination = destination?.trim();

  if (normalizedDestination) {
    constraints.push(where("city", "==", normalizedDestination));
  }
  if (cursor) constraints.push(startAfter(cursor));
  constraints.push(limit(PAGE_SIZE));

  const propertiesQuery = query(
    collection(db, "properties"),
    ...constraints,
  );
  const snapshot = await getDocs(propertiesQuery);
  const lastDocument = snapshot.docs.at(-1);

  const properties = snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      title: asText(data.title),
      city: asText(data.city),
      description: asText(data.description),
      price: asNumber(data.price),
      bedrooms: asNumber(data.bedrooms),
      photos: asPhotos(data.photos),
    };
  });

  return {
    properties,
    nextCursor:
      snapshot.docs.length === PAGE_SIZE ? lastDocument : undefined,
  };
}
