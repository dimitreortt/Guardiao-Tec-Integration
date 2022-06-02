import { Vehicle } from "./../../domain/entities/Vehicle";
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
  DocumentData,
  Query,
  collectionGroup,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./../../firebase/firebase";
import { VehicleRepository } from "../../domain/repository/VehicleRepository";

export class VehicleRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addVehicle(vehicle: Vehicle, companyId: string): Promise<void> {
    const colRef = collection(this.db, `companies/${companyId}/vehicles`);
    const q = query(colRef, where("Placa", "==", vehicle.values.Placa));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0)
      throw new Error("Veículo com esta placa já foi cadastrado!");
    addDoc(colRef, vehicle.values);
  }

  async updateVehicle(vehicle: Vehicle, companyId: string, vehicleId: string) {
    const docRef = doc(this.db, `companies/${companyId}/vehicles/${vehicleId}`);
    setDoc(docRef, vehicle.values);
  }

  async getVehicles(): Promise<Vehicle[]> {
    const colRef = collection(this.db, "vehicles");
    // const q = query(colRef);
    return this.getVehiclesFromQuery(colRef);
  }

  async getVehiclesFromQuery(query: Query<DocumentData>): Promise<Vehicle[]> {
    const querySnapshot = await getDocs(query);
    let vehicles: Vehicle[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      data["Ano Fabricação"] = data["Ano Fabricação"].toDate();
      data["Ano Modelo"] = data["Ano Modelo"].toDate();
      data["Último Licenciamento"] = data["Último Licenciamento"].toDate();
      data.transpId = doc.ref.parent.parent?.id;
      data.Id = doc.id;
      vehicles.push(new Vehicle(data));
    });
    return vehicles;
  }

  async getVehiclesFromCompanyId(companyId: string): Promise<Vehicle[]> {
    const q = collection(this.db, `companies/${companyId}/vehicles`);
    return this.getVehiclesFromQuery(q);
  }

  async adminGetAllVehicles() {
    const q = collectionGroup(this.db, "vehicles");
    return this.getVehiclesFromQuery(q);
  }

  async deleteVehicle(companyId: string, vehicleId: string) {
    const docRef = doc(this.db, `companies/${companyId}/vehicles/${vehicleId}`);
    await deleteDoc(docRef);
  }
}
