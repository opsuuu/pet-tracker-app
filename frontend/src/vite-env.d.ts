/// <reference types="vite/client" />

//* Declare Modules
declare module "dayjs/locale/zh-tw" {
  const zh: Parameters<typeof import("dayjs").locale>[0];

  export default zh;
}

declare module "virtual:i18next-loader" {
  const contents: import("i18next").Resource;

  export default contents;
}

interface ImportMetaEnv {
  readonly VITE_DAY_LOCALES: Record<string, Parameters<typeof import("dayjs").locale>[0]>;
  readonly VITE_DEFAULT_LANG: string;
  readonly VITE_AVAILABLE_LANGUAGES: string[];
  readonly VITE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
