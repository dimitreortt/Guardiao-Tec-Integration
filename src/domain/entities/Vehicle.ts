type VehicleInput = {
  Marca: string;
  Modelo: string;
  Cor: string;
  "Ano Fabricação": Date;
  "Ano Modelo": Date;
  Placa: string;
  "Capacidade(m3)": string;
  Chassi: string;
  Renavam: string;
  Categoria: string;
  Id?: string;
  "Último Licenciamento": Date;
  transpId: string;
};

export class Vehicle {
  constructor(readonly values: VehicleInput) {
    this.validate();
  }

  isPositiveInteger(str: string) {
    const num = Number(str);
    if (Number.isInteger(num) && num > 0) return true;
    return false;
  }

  validate() {
    // if (!this.isPositiveInteger(this.values['Capacidade(m3)']))
    //   throw new Error('Capacidade deve ser um número!');
  }
}
