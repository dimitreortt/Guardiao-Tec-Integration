type FTValues = {
  'Numero de Contrato': string;
  Código: string;
  'Origem/Destino': string;
  'Nº da FT': string;
  'Nº da Linha': string;
  'Data de Vigencia Inicial': Date;
  Frequência: string[];
  Sentido: string;
  Id?: string;
};

export class FT {
  constructor(readonly values: FTValues) {}
}
