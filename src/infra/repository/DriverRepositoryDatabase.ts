import { Driver } from "./../../domain/entities/Driver";
import { SetDriversType } from "./../../application/store/features/drivers/driversSlice";
import { db } from "./../../firebase/firebase";
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
  getDoc,
  collectionGroup,
  Query,
  DocumentData,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { DriverRepository } from "./../../domain/repository/DriverRepository";

// export class DriverRepositoryDatabase implements DriverRepository {
export class DriverRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addDriver(driver: Driver, companyId: string): Promise<void> {
    const colRef = collection(this.db, `companies/${companyId}/drivers`);
    const q = query(colRef, where("cnh", "==", driver.values.cnh));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0)
      throw new Error("Motorista já cadastrado com essa cnh");

    const data = {
      cnh: driver.values.cnh,
      nome: driver.values.nome,
      contato: driver.values.contato,
      vencimento: driver.values.vencimento,
      cnhDocument: driver.values.cnhDocument,
    };

    const driversCollectionRef = collection(
      this.db,
      `companies/${companyId}/drivers`
    );
    addDoc(driversCollectionRef, data);
  }

  async updateDriver(driver: Driver, companyId: string, driverId: string) {
    const docRef = doc(this.db, `companies/${companyId}/drivers/${driverId}`);
    const data = {
      cnh: driver.values.cnh,
      nome: driver.values.nome,
      contato: driver.values.contato,
      vencimento: driver.values.vencimento,
      cnhDocument: driver.values.cnhDocument,
    };
    setDoc(docRef, data);
  }

  async getDrivers(): Promise<Driver[]> {
    const colRef = collection(this.db, "drivers");
    const q = query(colRef);
    return this.getDriversFromQuery(q);
  }

  async getDriversFromCompanyId(companyId: string) {
    const colRef = collection(this.db, `companies/${companyId}/drivers`);
    const q = query(colRef);
    return this.getDriversFromQuery(q);
  }

  async getDriversFromQuery(query: Query<DocumentData>) {
    const querySnapshot = await getDocs(query);
    let drivers: Driver[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      data.vencimento = data.vencimento.toDate();
      data.Id = doc.id;
      drivers.push(new Driver(data));
    });
    return drivers;
  }

  async adminGetAllDrivers() {
    const driversQuery = query(collectionGroup(db, "drivers"));
    return this.getDriversFromQuery(driversQuery);
  }

  async deleteDriver(companyId: string, driverId: string) {
    const docRef = doc(this.db, `companies/${companyId}/drivers/${driverId}`);
    await deleteDoc(docRef);
  }
}
