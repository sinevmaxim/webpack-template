import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildWebpackParams } from 'config/webpack/buildWebpack';

export type BuildRulesParams = Pick<BuildWebpackParams, 'mode'>;

export const buildRules = (params: BuildRulesParams): webpack.ModuleOptions['rules'] => {
  const isDev = params.mode === 'development';

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]__[hash:base64:5]' : '[hash:base64:8]',
      },
    },
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoaderWithModules],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [cssLoader, tsLoader];
};
