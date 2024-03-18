export const convertDate = (dateString: string) => {
  dateString = dateString.split(', ')[0]
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const parts = dateString.split(".");
  const day = parseInt(parts[0], 10);
  const monthIndex = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return `${day} ${months[monthIndex]} ${year}`;
}