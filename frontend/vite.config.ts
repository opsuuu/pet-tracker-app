import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import i18nextLoader from "vite-plugin-i18next-loader";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
import zh from "dayjs/locale/zh-tw";
import fs from "fs";
import path from "path";
import version from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    i18nextLoader({ namespaceResolution: "relativePath", paths: ["./src/locales"] }),
    VitePWA({
      manifest: {
        name: "PetTracker",
        short_name: "PetTracker",
        icons: [],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    open: true,
  },
  define: {
    "import.meta.env.VITE_DAY_LOCALES": JSON.stringify({ zh }),
    "import.meta.env.VITE_DEFAULT_LANG": JSON.stringify("zh-TW"),
    "import.meta.env.VITE_AVAILABLE_LANGUAGES": JSON.stringify(
      fs
        .readdirSync(path.resolve(__dirname, "./src/locales"))
        .filter(fileName => !/^index\.(t|j)s$/.test(fileName)),
    ),
    "import.meta.env.VITE_VERSION": JSON.stringify(version),
  },
});
