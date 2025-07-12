import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // точка входа
  outDir: "dist", // куда складывать сборку
  format: ["esm", "cjs"], // форматы вывода
  dts: true, // генерировать *.d.ts
  minify: true, // минифицировать сборку
  clean: true, // очищать папку перед сборкой
  sourcemap: true, // полезно для отладки
  target: "es2018", // JS target (поддержка async/await и т.д.)
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@mui/material",
    "@mui/icons-material",
    "@emotion/react",
    "@emotion/styled",
  ], // не включать в сборку — потребитель сам установит
});
