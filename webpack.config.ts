import { webpackConfig } from "./config/build/webpackBase";
import { ConfigEnv, WebpackMode } from "./config/build/types";
import path from "path";

export default (env: ConfigEnv) => {
  const paths = {
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: path.resolve(__dirname, "dist"),
    public: path.resolve(__dirname, "public"),
  };
  return webpackConfig({
    port: env.port ?? 3000,
    paths,
    mode: env.mode ?? WebpackMode.Dev,
    analyzer: env.analyzer,
  });
};
