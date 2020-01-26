'use strict';

var gulp = require('gulp'),
  del = require('del'),
  watchEjs = require("../index");
 
 gulp.task('del', function() {
  del('./dist/**/*')
 });

 gulp.task('default', ['del'], function() {
  gulp.src("./templates/*.ejs")
    .pipe(watchEjs("./templates/*.ejs"))
    .pipe(gulp.dest("./dist"));
 })