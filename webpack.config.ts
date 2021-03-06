
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import autoinclude from './document/autoinclude';

const config = 
{
  entry: './document/root',
  output:
  {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve:
  {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.gm'],
  },
  module: 
  {
    rules: 
    [
      {
        test: /\.gm$/,
        exclude: /node_modules/,
        include: /document/,
        use: [
          'babel-loader',
          {
            loader: path.resolve(__dirname, './src/loaders/goma-loader.ts'),
            options: { autoinclude },
          },
        ],
      },
      {
        test: /\.bib$/,
        exclude: /node_modules/,
        include: /document/,
        use: 
        [
          'json-loader',
          path.resolve(__dirname, './src/loaders/bibtex-loader.ts'),
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: 
        [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: 
        [
          {
            loader: 'file-loader',
            options: 
            {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: 
  [
    new HTMLWebpackPlugin(
      {
        template: 'public/index.html',
        filename: 'index.html',
      }
    ),
  ],
};

export default config;
