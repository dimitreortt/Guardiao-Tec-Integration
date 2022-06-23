export type ftDocumentFileData = {
  name: string;
  type: string;
  storagePath: string;
};

type FTValues = {
  "Numero de Contrato": string;
  Código: string;
  "Origem/Destino": string;
  "Nº da FT": string;
  "Nº da Linha": string;
  "Data de Vigencia Inicial": Date;
  Frequência: string[];
  Sentido: string;
  ftDocumentFileData: ftDocumentFileData;
  Id?: string;
};

export class FT {
  constructor(readonly values: FTValues) {}
}
