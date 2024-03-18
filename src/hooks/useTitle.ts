import { useEffect } from "react";
import { SITE_TITLE } from "../constants/constants";

export const useTitle = ( title: string ) =>  {
  useEffect((): void => {
    document.title = `${title} | ${SITE_TITLE}`;
  }, [title]);
}