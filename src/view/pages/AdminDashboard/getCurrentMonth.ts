const map = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro",
};

export const getCurrentMonth = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  console.log(month);
  //@ts-ignore
  return map[month] + " de " + year;
};
