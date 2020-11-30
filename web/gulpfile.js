const gulp = require('gulp')
const path = require('path')
const del = require('del')
const less = require('gulp-less')
const replace = require('gulp-replace')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const connect = require('gulp-connect')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const fileinclude = require('gulp-file-include')

// confit
const config = {
  // 入口
  entry: 'src',
  // build、dev导出
  output: 'dist',
  // .css
  css: ['src/**/*.less', 'src/**/*.css'],
  // .js
  js: ['src/**/*.js'],
  // .html
  html: ['src/**/*.html'],
  // build cdn地址
  cdn: '',
  rem: false
}

// 日志输出
function log() {
  const args = Array.prototype.slice.call(arguments)
  gutil.log.apply(null, args)
}

function watch() {
  const watcher = gulp.watch(['src/**'], { ignored: /[/\\]\./ })
  return watcher.on('all', watchAll)
}

// watch all
function watchAll(event, file) {
  log(`${gutil.colors.yellow(file)} ${event}, running task...`)
  const extname = path.extname(file) // 文件扩展名
  if (/.(less)$/i.test(extname)) {
    lessToCss(file) // 样式 文件
  } else if (/.(js)$/i.test(extname)) {
    js(file) // js 文件
  } else if (/.(html)$/i.test(extname)) {
    html(file) // html 文件
  } else {
    copyFiles(file)
  }
}

// less to css
function lessToCss(file) {
  // base 不复制当前文件的目录结构，让文件生成在当前目录中
  const plugins = [
    autoprefixer({
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ],
      grid: true
    })
  ]
  gulp.src(file || config.css, { allowEmpty: true, base: config.entry })
    .pipe(plumber())
    .pipe(less())
    .pipe(replace(/(-?\d+(\.\d+)?)px/gi, (m, num) => {
      return config.rem ? (num / 75).toFixed(6) + 'rem' : `${num}px` // px to rem
    }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(config.output))
}

// js
function js(file) {
  gulp.src(file || config.js, { allowEmpty: true, base: config.entry })
    .pipe(babel())
    // .pipe(uglify())
    .pipe(gulp.dest(config.output))
}

// html
function html(file) {
  gulp.src(file || config.html, { allowEmpty: true, base: config.entry })
    .pipe(fileinclude())
    .pipe(replace(/\.less/gi, () => {
      return '.css';
    }))
    .pipe(gulp.dest(config.output))
}

// 复制其它文件
function copyFiles(file) {
  return gulp.src(file, { allowEmpty: true, base: config.entry })
    .pipe(gulp.dest(config.output))
}

// 初始化复制文件
async function initFiles() {
  await del(config.output)
  await lessToCss()
  await js()
  await html()
  await copyFiles(['src/**/*', '!src/**/*.html', '!src/**/*.less', '!src/**/*.js', '!src/**/*.css', '!src/**/*.scss'])
}


// build css
function buildCss() {
  // base 不复制当前文件的目录结构，让文件生成在当前目录中
  const plugins = [
    autoprefixer({
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ],
      grid: true
    })
  ]
  gulp.src(config.css, { allowEmpty: true, base: config.entry })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss(plugins))
    .pipe(replace(/(-?\d+(\.\d+)?)px/gi, (m, num) => {
      return config.rem ? (num / 75).toFixed(6) + 'rem' : `${num}px` // px to rem
    }))
    // .pipe(rev())
    // .pipe(gulp.dest(config.output))
    // .pipe(rev.manifest({
    //   path: 'rev/css.json'
    // }))
    .pipe(gulp.dest(config.output))
}

// build js
function buildJs() {
  gulp.src(config.js, { allowEmpty: true, base: config.entry })
    .pipe(babel())
    // .pipe(uglify())
    // .pipe(rev())
    // .pipe(gulp.dest(config.output))
    // .pipe(rev.manifest({
    //   path: 'rev/js.json'
    // }))
    .pipe(gulp.dest(config.output))
}

// build html
function buildHtml() {
  const files = ['dist/rev/*.json']
  files.push(...config.html)
  gulp.src(files, { allowEmpty: true, base: config.entry })
    .pipe(fileinclude())
    .pipe(replace(/\.less/gi, () => {
      return '.css';
    }))
    .pipe(replace(/assets\//gi, () => {
      return config.cdn ? config.cdn : 'assets/';
    }))
    // .pipe(revCollector({
    //   replaceReved: true,
    //   dirReplacements: {}
    // }))
    .pipe(gulp.dest(config.output))
}

async function build() {
  await del(config.output)
  await buildCss()
  await buildJs()
  await copyFiles(['src/**/*', '!src/**/*.html', '!src/**/*.less', '!src/**/*.js', '!src/**/*.css', '!src/**/*.scss'])
  // 延迟处理，否则revCollector不生效暂时没找到原因
  setTimeout(() => {
    buildHtml()
    del(`${config.output}/rev`)
  }, 1000)
}

// 启动本地站点
function webserver() {
  connect.server({
    // host: '0.0.0.0',
    livereload: true,
    root: 'dist',
    port: 9001

  })
}

function delFile() {
  del(`${config.output}/**/include`)
  del(`${config.output}/**/assets/style/reset.css`)
}

// webserver
gulp.task('webserver', gulp.series(
  webserver
))

// 监听文件变化
gulp.task('dev', gulp.series(
  initFiles,
  watch
))

// build
gulp.task('build', gulp.series(
  build
))

// del
gulp.task('del', gulp.series(
  delFile
))
