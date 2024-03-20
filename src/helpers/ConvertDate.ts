import { dateWithoutTime } from "./ChangeDateFormat";

export const convertDate = (storeDate: string) => {
  const date = dateWithoutTime(storeDate)
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const parts = date.split("-");
  return `${parts[2]} ${months[Number(parts[1])-1]} ${parts[0]}`;
}