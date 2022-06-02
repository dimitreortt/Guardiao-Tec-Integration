import { Company } from "./../../domain/entities/Company";
import {
  Firestore,
  where,
  collection,
  query,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { CompanyRepository } from "./../../domain/repository/CompanyRepository";

export class CompanyRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addCompany(company: Company): Promise<void> {
    const colRef = collection(this.db, "companies");
    const q = query(colRef, where("CNPJ", "==", company.values.CNPJ));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0)
      throw new Error("Transportadora com este CNPJ já foi cadastrada!");

    await addDoc(colRef, company.values);
  }

  async updateCompany(company: Company, companyId: string) {
    const docRef = doc(this.db, `companies/${companyId}`);
    await setDoc(docRef, company.values);
  }

  async getCompanyFromId(companyId: string) {
    const docRef = doc(this.db, `companies/${companyId}`);
    const docSnapshot: any = await getDoc(docRef);
    const data: any = docSnapshot.data();
    data.Id = docSnapshot.id;
    return new Company(data);
  }

  async adminGetAllCompanies() {
    const colRef = collection(this.db, "companies");
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    let companies: Company[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      data.Id = doc.id;
      companies.push(new Company(data));
    });
    return companies;
  }

  async deleteCompany(companyId: string) {
    const docRef = doc(this.db, `companies/${companyId}`);
    // await setDoc(docRef, company.values);
    await deleteDoc(docRef);
  }
}
