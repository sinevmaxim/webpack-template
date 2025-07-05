import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildWebpackParams } from 'config/webpack/buildWebpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export type BuildPluginsParams = Pick<BuildWebpackParams, 'mode' | 'htmlTemplatePath'>;

export const buildPlugins = (params: BuildPluginsParams): webpack.Configuration['plugins'] => {
  const isDev = params.mode === 'development';
  const isProd = params.mode === 'production';

  const plugins: webpack.Configuration['plugins'] = [];
  plugins.push(new HtmlWebpackPlugin({ template: params.htmlTemplatePath }));

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin());
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
