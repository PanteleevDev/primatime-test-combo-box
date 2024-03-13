import { Configuration } from "webpack";
import { ConfigEnv, WebpackMode } from "../types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const loaders = (env: ConfigEnv): Configuration["module"]["rules"] => {
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };
  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName:
          env.mode === WebpackMode.Dev
            ? "[path][name]__[local]"
            : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      env.mode === WebpackMode.Dev
        ? "style-loader"
        : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      "sass-loader",
    ],
  };
  const swcLoader = {
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: {
      loader: "swc-loader",
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            dynamicImport: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    },
  };
  return [assetLoader, scssLoader, swcLoader, svgrLoader];
};
