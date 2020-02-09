import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/toast.js",
    output: {
      file: "dist/toast.min.js",
      format: "umd",
      name: "toast"
    },
    plugins: [babel(), terser()]
  },
  {
    input: "demo/index.js",
    output: {
      file: "demo/index.min.js",
      format: "iife"
    },
    plugins: [babel(), terser()]
  }
];
