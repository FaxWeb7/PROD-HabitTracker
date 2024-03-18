import { IconType } from "react-icons";
import { IoIosCalendar } from "react-icons/io";
import { IoMdStats } from "react-icons/io";
import { CiShop } from "react-icons/ci";

interface IHeaderNavList {
    icon: IconType,
    title: string,
    link: string
}

export const HeaderNavList: IHeaderNavList[] = [
    {
        icon: IoIosCalendar,
        title: "Привычки",
        link: "/",
    },
    {
        icon: IoMdStats,
        title: "Статистика",
        link: "/dashboard",
    },
    {
        icon: CiShop,
        title: "Магазин",
        link: "/shop",
    }
]