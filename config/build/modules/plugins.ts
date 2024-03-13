import HtmlWebpackPlugin from "html-webpack-plugin";
import { ConfigEnv, WebpackMode } from "../types";
import path from "path";
import { Configuration, ProgressPlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import fs from "fs";

export const plugins = (env: ConfigEnv): Configuration["plugins"] => {
  const fav = path.resolve(env.paths.public, "favicon.ico");
  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: path.resolve(env.paths.public, "index.html"),
      favicon: fs.existsSync(fav) ? fav : undefined,
    })
  ];

  if (env.mode === WebpackMode.Dev) {
    plugins.push(new ProgressPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (env.mode === WebpackMode.Prod) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
  }

  if (env.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins.filter(Boolean);
};
