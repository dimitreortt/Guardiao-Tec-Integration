export const getCurrentFormattedDate = () => {
  // const date = new Date();
  let date = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  date = date.split(" ")[0];
  const [day, month, year] = date.split("/");

  return day + month + year;
};

export const getFormattedDateWithOffset = (daysOffset?: number) => {
  let date = new Date();
  if (daysOffset) {
    date.setDate(date.getDate() + daysOffset);
  }
  let dateStr = date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  let datePieces = dateStr.split(" ")[0];
  const [day, month, year] = datePieces.split("/");

  return day + month + year;
};
