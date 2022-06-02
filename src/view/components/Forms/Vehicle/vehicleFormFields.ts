import { IFormField } from "../../../../domain/entities/FormField";

export const vehicleFormFields = () => {
  const vehicleFields: IFormField[] = [
    { label: "Marca", type: "Short Text", id: 0, index: 0 },
    { label: "Modelo", type: "Short Text", id: 1, index: 1 },
    { label: "Cor", type: "Short Text", id: 2, index: 2 },
    { label: "Ano Fabricação", type: "Year", id: 3, index: 3 },
    { label: "Ano Modelo", type: "Year", id: 4, index: 4 },
    { label: "Placa", type: "Short Text", id: 5, index: 5 },
    { label: "Chassi", type: "Short Text", id: 7, index: 7 },
    { label: "Renavam", type: "Short Text", id: 8, index: 8 },
    { label: "Último Licenciamento", type: "Date", id: 10, index: 10 },
    { label: "Capacidade(m3)", type: "Short Text", id: 6, index: 6 },
    {
      label: "Categoria",
      type: "List Selection",
      options: ["Leve", "Pesado"],
      id: 9,
      index: 9,
    },
  ];
  return vehicleFields;
};
