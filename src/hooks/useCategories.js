import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("order"));
    const unsub = onSnapshot(q, (snap) => {
      const cats = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
      setCategories(cats);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { categories, loading };
}