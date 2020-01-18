const gulp = require('gulp')
const gutil = require('gulp-util')
const oss = require('gulp-oss-sync')

// 获取用户配置
const config = require('./config.js')

// 日志输出
function log() {
  const args = Array.prototype.slice.call(arguments)
  gutil.log.apply(null, args)
}
// 上传oss
function uploadOSS() {
  log(`将静态资源目录${config.assets}中的所有文件上传至OSS CDN中...`)
  return gulp.src(config.assets)
    .pipe(oss(config.oss))
}
gulp.task('upload:oss', uploadOSS)
