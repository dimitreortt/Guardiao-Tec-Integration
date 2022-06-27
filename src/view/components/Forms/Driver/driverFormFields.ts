import { IFormField } from "../../../../domain/entities/FormField";

export const driverFormFields = () => {
  const driverFields: IFormField[] = [
    { label: "Nome", type: "Short Text", id: 0, index: 0 },
    { label: "Contato", type: "Phone Number", id: 2, index: 2 },
    { label: "CNH", type: "Short Text", id: 1, index: 1 },
    { label: "Vencimento", type: "Date", id: 3, index: 3 },
    {
      label: "Período",
      type: "List Selection",
      options: ["Diurno", "Noturno"],
      id: 4,
      index: 4,
    },
  ];
  return driverFields;
};
