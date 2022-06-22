export const getCurrentFormattedDate = () => {
  // const date = new Date();
  let date = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  date = date.split(" ")[0];
  const [day, month, year] = date.split("/");

  return day + month + year;
};
