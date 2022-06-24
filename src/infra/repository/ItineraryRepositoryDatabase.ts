import { Itinerary } from "./../../domain/entities/Itinerary";
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
  Query,
  DocumentData,
  collectionGroup,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./../../firebase/firebase";

export class ItineraryRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addItinerary(itinerary: Itinerary, companyId: string): Promise<void> {
    const colRef = collection(this.db, `companies/${companyId}/itineraries`);
    const q = query(
      colRef,
      where("LTU Correspondente", "==", itinerary.values["LTU Correspondente"]),
      where("Sequencia", "==", itinerary.values.Sequencia)
    );
    const qSnapshot = await getDocs(q);
    if (qSnapshot.docs.length > 0)
      throw new Error("Já existe um registro nessa LTU com essa sequência!");

    addDoc(colRef, itinerary.values);
  }

  async updateItinerary(
    itinerary: Itinerary,
    companyId: string,
    itineraryId: string
  ) {
    const docRef = doc(
      this.db,
      `companies/${companyId}/itineraries/${itineraryId}`
    );
    await setDoc(docRef, itinerary.values);
  }

  async getItineraries(): Promise<Itinerary[]> {
    const colRef = collection(this.db, "itineraries");
    return this.getItinerariesFromQuery(colRef);
  }

  async getItinerariesFromQuery(query: Query<DocumentData>) {
    const querySnapshot = await getDocs(query);
    let itineraries: Itinerary[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      for (const field of [
        "Chegada",
        "Partida",
        "Serviço",
        "Espera",
        "Livre",
        "Horas",
      ]) {
        if (data[field]) data[field] = data[field].toDate();
      }
      // data["Chegada"] = data["Chegada"].toDate();
      // data["Partida"] = data["Partida"].toDate();
      // data["Serviço"] = data["Serviço"].toDate();
      // data["Espera"] = data["Espera"].toDate();
      // data["Livre"] = data["Livre"].toDate();
      // data["Horas"] = data["Horas"].toDate();
      data.Id = doc.id;
      itineraries.push(new Itinerary(data));
    });
    return itineraries;
  }

  async adminGetAllItineraries() {
    const query = collectionGroup(this.db, "itineraries");
    return this.getItinerariesFromQuery(query);
  }

  async getItinerariesFromCompanyId(companyId: string) {
    const colRef = collection(this.db, `companies/${companyId}/itineraries`);
    return this.getItinerariesFromQuery(colRef);
  }

  async getItinerariesFromLTU(LTU: string) {
    const group = collectionGroup(this.db, "itineraries");
    const q = query(group, where("LTU Correspondente", "==", LTU));
    return this.getItinerariesFromQuery(q);
  }

  async deleteItinerary(companyId: string, itineraryId: string) {
    const docRef = doc(
      this.db,
      `companies/${companyId}/itineraries/${itineraryId}`
    );
    await deleteDoc(docRef);
  }
}
