import { query, where, getDocs, collection, type QueryConstraint } from "firebase/firestore"
import { db } from "@/lib/firebase/firestore"
type SearchPropertiesParams = {
    destination?: string;
};
export const searchProperties = async ({destination}: SearchPropertiesParams = {}) => {
  const constraints: QueryConstraint[] = [where("status", "==", "approved")];
  if(destination?.trim()){
     constraints.push(
            where("city", "==", destination.trim()),
        );
  }
  const propertiesQuery = query(
               collection(db, "properties"),
               ...constraints,
  );
 const snapshot = await getDocs(propertiesQuery);
 return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
 }));
}