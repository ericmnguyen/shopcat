export const convertToCurrency = (text) =>
  isNaN(text) ? text : parseFloat(text).toFixed(2);
