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
