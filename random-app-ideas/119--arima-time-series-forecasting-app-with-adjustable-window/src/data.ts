export function generateData() {
  const data = [];
  let value = 100;
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    value += Math.random() * 10 - 5;
    data.push({
      date: date.toISOString().slice(0, 10),
      value: value,
      forecast: null,
    });
  }

  // Add a forecast
  for (let i = 80; i < 100; i++) {
    data[i].forecast = data[i].value + Math.random() * 10 - 5;
  }
  return data;
}
