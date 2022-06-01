export const checkIsCNHDueDate = (cnhDueDate: Date) => {
  const month = cnhDueDate.getMonth();
  const year = cnhDueDate.getFullYear();

  return month === new Date().getMonth() && year === new Date().getFullYear();
};
