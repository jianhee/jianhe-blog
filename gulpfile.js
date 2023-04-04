// Gulp Config
// --------------------------

// path
const srcPath = './src/';
const destPath = './dist/';

// gulp
const { src, dest, watch, series, parallel } = require('gulp');

// plugins
const del = require('del');
const scssmin = require('gulp-sass')(require('sass'));
const jsuglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// 删除
async function delTask(cb) {
  await del(destPath, cb);
}

// 复制 HTML
function htmlTask(cb) {
  src(`${srcPath}**/*.html`, { base: './src' }).pipe(dest(destPath));

  cb();
}

// 编译/压缩 SCSS
function scssTask(cb) {
  const options = {
    outputStyle: 'compressed' // 压缩模式
  };
  src(`${srcPath}styles/*.scss`)
    .pipe(scssmin(options))
    .pipe(dest(`${destPath}styles`));

  cb();
}

// 编译/混淆/压缩 JavaScript
function jsTask(cb) {
  const options = {
    compress: {
      // drop_console: true, // 删除 console
      // drop_debugger: true // 删除 debugger
    }
  };
  src([`${srcPath}scripts/*.js`])
    .pipe(jsuglify(options))
    .pipe(dest(`${destPath}scripts`));

  cb();
}

// 压缩图片
function imgTask(cb) {
  src(`${srcPath}images/**`)
    .pipe(imagemin())
    .pipe(dest(`${destPath}images`));

  cb();
}

// 监听
function watchTask() {
  watch(`${srcPath}**/*.html`, htmlTask);
  watch(`${srcPath}styles/*.scss`, scssTask);
  watch(`${srcPath}scripts/*.js`, jsTask);
  watch(`${srcPath}images/*`, imgTask);
}

exports.default = series(delTask, parallel(htmlTask, scssTask, jsTask, imgTask));
exports.watch = watchTask;
