import path from 'path';
import 'webpack-dev-server';
import { buildWebpack } from './config/webpack/buildWebpack';
import { buildRules } from './config/webpack/buildRules';

interface Env {
  mode?: 'development' | 'production';
}

export default (env: Env) => {
  console.log(buildRules({ mode: 'development' }));

  return buildWebpack({
    mode: env.mode ?? 'development',
    htmlTemplatePath: path.resolve(__dirname, 'public', 'index.html'),
    aliasPath: path.resolve(__dirname, 'src'),
    entryPath: path.resolve(__dirname, 'src', 'index.tsx'),
    outputPath: path.resolve(__dirname, 'dist'),
    tsConfigPath: path.resolve(__dirname, 'tsconfig.json'),
  });
};
