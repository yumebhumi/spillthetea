import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFile);

const compat = new FlatCompat({
  baseDirectory: currentDirectory,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".next-corrupt-2137/**",
      ".next-broken-*/**",
      ".next-restart-fix/**",
      ".next-runtime-bug/**",
      ".next-devcache-4/**",
      ".next-env-reload-fix/**",
      ".next-plain-render-fix/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
