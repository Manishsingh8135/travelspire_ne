import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "legacy/**",
      "helper-ui-components/**",
      "docs/**",
      "docs-new/**",
      "public/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default config;
