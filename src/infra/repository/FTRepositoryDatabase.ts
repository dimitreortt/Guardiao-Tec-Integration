import { FT } from "./../../domain/entities/FT";
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
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./../../firebase/firebase";
import { FormFieldValue } from "../../domain/entities/FormField";

export class FTRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addFT(FT: FT, companyId: string): Promise<void> {
    const colRef = collection(this.db, `companies/${companyId}/fts`);
    const q = query(colRef, where("Nº da FT", "==", FT.values["Nº da FT"]));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0)
      throw new Error("Ficha Técnica com esse número já cadastrada!");
    addDoc(colRef, FT.values);
  }

  async updateFT(ft: FT, companyId: string, ftId: string) {
    const docRef = doc(this.db, `companies/${companyId}/fts/${ftId}`);
    setDoc(docRef, ft.values);
  }

  async updateManyFTs(
    companyId: string,
    field: string,
    newValue: FormFieldValue
  ) {
    const colRef = collection(this.db, `companies/${companyId}/fts`);
    const querySnapshot = await getDocs(colRef);
    const ftsIds = querySnapshot.docs.map((doc) => doc.id);
    for (const id of ftsIds) {
      const docRef = doc(this.db, `companies/${companyId}/fts/${id}`);
      await updateDoc(docRef, { [field]: newValue });
    }
    return ftsIds.length;
  }

  async getFTs(): Promise<FT[]> {
    const colRef = collection(this.db, "fts");
    return this.getFTsFromQuery(colRef);
  }

  async getFTsFromQuery(query: Query<DocumentData>) {
    const querySnapshot = await getDocs(query);
    let fts: FT[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      data["Data de Vigencia Inicial"] =
        data["Data de Vigencia Inicial"].toDate();
      data.Id = doc.id;
      fts.push(new FT(data));
    });
    return fts;
  }

  async adminGetAllFTs() {
    const query = collectionGroup(this.db, "fts");
    return this.getFTsFromQuery(query);
  }

  async getFTsFromCompanyId(companyId: string) {
    const query = collection(this.db, `companies/${companyId}/fts`);
    return this.getFTsFromQuery(query);
  }

  async deleteFT(companyId: string, ftId: string) {
    const docRef = doc(this.db, `companies/${companyId}/fts/${ftId}`);
    await deleteDoc(docRef);
  }
}
