export type PlanningReportValues = {
  aberturaLinha: Date;
  codigoTMS: number;
  ft: string;
  horarioEnvio: Date;
  linha: string;
  placa: string;
  resultado: "Sucesso" | "Erro";
  transpId: string;
  transportadora: string;
  mensagem?: string;
};

export type ReportValues = {
  createdAt: Date;
  ft: string;
  message: string;
  status: "error" | "success";
  transpId: string;
  transportadora: string;
};

export class Report {
  constructor(readonly values: ReportValues) {}
}
