import webpack from 'webpack';
import 'webpack-dev-server';
import { buildRules } from './buildRules';
import { buildPlugins } from './buildPlugins';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

export interface BuildWebpackParams {
  mode: 'production' | 'development';
  entryPath: string;
  outputPath: string;
  aliasPath: string;
  htmlTemplatePath: string;
  tsConfigPath: string;
}

export const buildWebpack = (params: BuildWebpackParams) => {
  const isDev = params.mode === 'development';

  const config: webpack.Configuration = {
    mode: params.mode,
    entry: params.entryPath,
    output: {
      path: params.outputPath,
      filename: '[name].[contenthash].js',
      clean: true,
    },

    plugins: buildPlugins({ mode: params.mode, htmlTemplatePath: params.htmlTemplatePath }),

    module: {
      rules: buildRules({ mode: params.mode }),
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsconfigPathsPlugin({ configFile: params.tsConfigPath })],
    },

    devtool: isDev && 'inline-source-map',
    devServer: isDev
      ? {
          static: './dist',
          port: 5800,
        }
      : undefined,

    optimization: {
      runtimeChunk: 'single',
    },
  };

  return config;
};
