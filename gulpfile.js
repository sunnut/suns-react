var gulp = require('gulp');
var runSequence =require('gulp4-run-sequence');
var rimraf = require('gulp-rimraf');
var merge = require('gulp-merge-json');

//监听词条文件变更
gulp.task('i18n-json-merge-watch', function(cb) {
  gulp.watch('./src/assets/i18n/parts/*.json', function () {
    runSequence(
      'i18n-json-merge',
      cb
    )
  });
});

//合并词条
gulp.task('i18n-json-merge', function(cb) {
  runSequence(
    'i18n-json-clean',
    'i18n-zh-json-merge',
    'i18n-en-json-merge',
    cb
  );
});

gulp.task('i18n-json-clean', function() {
  return gulp.src('./src/assets/i18n/*.json', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('i18n-zh-json-merge', function() {
  return gulp.src('./src/assets/i18n/parts/zh*.json')
    .pipe(merge({fileName: 'zh.json'}))
    .pipe(gulp.dest('./src/assets/i18n/'));
});

gulp.task('i18n-en-json-merge', function() {
  return gulp.src('./src/assets/i18n/parts/en*.json')
    .pipe(merge({fileName: 'en.json'}))
    .pipe(gulp.dest('./src/assets/i18n/'));
});