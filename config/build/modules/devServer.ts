import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { ConfigEnv, WebpackMode } from "../types";

export const devServer = (env: ConfigEnv): DevServerConfiguration => {
  return env.mode === WebpackMode.Dev
    ? {
        port: 3000,
        open: true,
        historyApiFallback: true,
      }
    : undefined;
};
