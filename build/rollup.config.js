import fs from 'fs';
import path from 'path';
import os from 'os';

import json from 'rollup-plugin-json';
import flow from 'rollup-plugin-flow-no-whitespace';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';
import copy from 'rollup-plugin-copy';
import { eslint } from 'rollup-plugin-eslint';
// web服务打开浏览器
import serve from 'rollup-plugin-serve';
// 压缩代码
import { terser } from 'rollup-plugin-terser';
// 新增 rollup-plugin-postcss 插件
import postcss from 'rollup-plugin-postcss';
// 新增 postcss plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';

function getIPAdress () {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

const { author, version } = require('../package.json');

function delDir (path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

function resolve (...args) {
  // eslint-disable-next-line no-undef
  return path.resolve(__dirname, '../', ...args);
}

export default function (ENV) {
  const isDev = ENV === 'development';
  const outputDir = !isDev ? 'dist' : 'example/lib';
  const time = new Date().toString();
  const host = getIPAdress();
  const port = 10001;

  const banner =
    `/*!
* sldt-utils v${version}
* author ${author}
* (c) ${time}
* @license MIT
*/`;
  const formatList = [{ format: 'umd', suffix: '' }];

  // 清除文件
  delDir(outputDir);

  if (!isDev) {
    formatList.push(
      { format: 'umd', suffix: '.min' },
      { format: 'cjs', suffix: '.common' },
      { format: 'es', suffix: '.esm' }
    );
  }
  return formatList.map(({ format, suffix }) => {
    return {
      input: resolve('src/index.js'),
      output: {
        format,
        banner,
        file: resolve(`${outputDir}/js/index${suffix}.js`),
        name: 'S',
        exports: 'named',
        footer: format === 'cjs' ? 'module.exports = exports[\'default\']' : ''
      },
      plugins: [
        eslint({
          fix: true
        }),
        postcss({
          extensions: ['css', 'scss'],
          extract: resolve(`${outputDir}/css/index${((!isDev && suffix == '.min') ? '.min' : '')}.css`),
          minimize: !isDev && suffix == '.min',
          plugins: [
            simplevars(),
            nested(),
            cssnext({ warnForDuplicates: false, }),
          ]
        }),
        flow(),
        json(),
        replace({
          '_VERSION_': version
        }),
        nodeResolve(),
        format !== 'es' && babel(),
        format !== 'es' && commonjs(),
        format !== 'es' && buble(),
        // 压缩
        !isDev && suffix === '.min' && terser({
          output: {
            ascii_only: true // 仅输出ascii字符
          },
          compress: {
            pure_funcs: ['console.log'] // 去掉console.log函数
          }
        }),
        suffix === '' && copy({
          verbose: true,
          hook: 'writeBundle',
          targets: [
            { src: 'src/fonts', dest: `${outputDir}` }
          ]
        }),
        // dev时
        isDev && (serve({
          open: true, // 是否打开浏览器
          contentBase: 'example/', // 入口HTML 文件位置
          historyApiFallback: true, // Set to true to return index.html instead of 404
          host,
          port,
        }))
      ],
      watch: {
        include: 'src/**'
      }
    };
  });
}
