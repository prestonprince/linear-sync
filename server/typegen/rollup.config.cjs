const { dts } = require("rollup-plugin-dts");

const config = [
  // …
  {
    input: "src/api/_app.ts",
    output: [{ file: "typegen/hono-api.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;
