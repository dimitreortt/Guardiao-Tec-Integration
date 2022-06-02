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
import { Report, ReportValues } from "../../domain/entities/Report";
import { db } from "../../firebase/firebase";

export class ReportsRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async getReports() {
    const q = collection(this.db, "tmsReports");
    const querySnapshot = await getDocs(q);
    const reports: ReportValues[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      data.createdAt = data.createdAt.toDate();
      reports.push(data);
    });
    return reports;
  }
}
