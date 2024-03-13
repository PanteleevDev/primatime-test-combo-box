import { devServer } from "./modules/devServer";
import { Configuration } from "webpack";
import { ConfigEnv, WebpackMode } from "./types";
import { loaders } from "./modules/loaders";
import { plugins } from "./modules/plugins";
import { resolver } from "./modules/resolvers";

export const webpackConfig: (env: ConfigEnv) => Configuration = (env) => {
  return {
    mode: env.mode ?? WebpackMode.Dev,
    entry: env.paths.entry,
    output: {
      path: env.paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    resolve: resolver(env),
    devtool: env.mode === WebpackMode.Dev ? "inline-source-map" : undefined,
    module: { rules: loaders(env) },
    plugins: plugins(env),
    devServer: devServer(env),
  };
};
