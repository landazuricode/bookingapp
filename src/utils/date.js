export const calculateDaysDifference = (startDate, endDate) => {
  // Convertir fechas
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calcular diferencia en milisegundos
  const timeDifference = end.getTime() - start.getTime();

  // Convertir milisegundos a dias
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  // Redondear resultado
  return Math.round(daysDifference) + 1;
};
