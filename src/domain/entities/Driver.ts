export type cnhDocument = {
  name: string;
  type: string;
  storagePath: string;
};

type DriverValues = {
  nome: string;
  cnh: string;
  contato: string;
  vencimento: Date;
  cnhDocument?: cnhDocument;
  Id?: string;
};

export class Driver {
  constructor(readonly values: DriverValues) {}
}
