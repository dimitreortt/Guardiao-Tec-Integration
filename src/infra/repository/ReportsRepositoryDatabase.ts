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
  onSnapshot,
} from "firebase/firestore";
import {
  getCurrentFormattedDate,
  getFormattedDateWithOffset,
} from "../../application/service/getCurrentFormattedDate";
import { setReportsType } from "../../application/store/features/tms/tmsSlice";
import {
  PlanningReportValues,
  Report,
  ReportValues,
} from "../../domain/entities/Report";
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

  listenReports(setReports: any) {
    for (let i = 0; i < 30; i++) {
      const q = collection(
        this.db,
        // `tmsPlanningReports/${getCurrentFormattedDate()}/reports`
        `tmsPlanningReports/${getFormattedDateWithOffset(-i)}/reports`
      );

      onSnapshot(q, (querySnapshot) => {
        const reports: PlanningReportValues[] = [];
        querySnapshot.forEach((doc) => {
          const data: any = doc.data();
          // data.createdAt = data.createdAt.toDate();
          data.horarioEnvio = data.horarioEnvio.toDate();
          data.aberturaLinha = data.aberturaLinha.toDate();
          reports.push(data);
        });
        setReports(reports);
      });
    }
  }
}
