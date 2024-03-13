import { Configuration } from "webpack";
import { ConfigEnv } from "../types";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export const resolver = (env: ConfigEnv): Configuration["resolve"] => {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": "./src",
    },
    plugins: [new TsconfigPathsPlugin({})],
  };
};
