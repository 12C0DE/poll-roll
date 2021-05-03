export const dateSplit = (dte) => {
  const dateArr = dte.split("/", 3);

  const dateFormatted = `${dateArr[2]}-${add0(dateArr[0])}-${add0(dateArr[1])}`;
  return dateFormatted;
};

const add0 = (input) => {
  return input.length > 1 ? input : `0${input}`;
};
