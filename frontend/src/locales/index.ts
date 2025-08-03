import i18n from "i18next";
import resources from "virtual:i18next-loader";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  defaultNS: "common",
  keySeparator: ".",
  lng: localStorage.getItem("LANUAGE") || import.meta.env.VITE_DEFAULT_LANG,
  resources,
  fallbackLng: import.meta.env.VITE_DEFAULT_LANG,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
});
