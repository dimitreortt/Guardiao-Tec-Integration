export const localeDateStrintWithouSeconds = (date: Date) => {
  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    ...{
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  });
};
