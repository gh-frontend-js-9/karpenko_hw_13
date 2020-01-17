# [gulp](http://gulpjs.com)-watch-ejs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
> Gulp 插件，使用 [gulp-watch][watch-url] 监听 [ejs][url-ejs] 模板及 `<% include xx %>` 的子模板并实时编译。

## 安装

```sh
$ npm install --save-dev gulp-watch-ejs
```


## 使用

```js
var gulp = require('gulp');
var watchEjs = require('gulp-watch-ejs');

gulp.task('default', function () {
  return gulp.src("./templates/*.ejs")
    .pipe(watchEjs("./templates/*.ejs"))
    .pipe(gulp.dest("./dist"));
});
```


## 配置

### `watchEjs(glob, [options, settings, callback])`

传回去的其实是一个在 [gulp-watch][watch-url] 中创建的 Duplex Stream。


## License

MIT &copy; [John Xiao][profile-url]


[url-ejs]: https://github.com/mde/ejs
[profile-url]: https://github.com/bammoo

[glob-url]: https://github.com/isaacs/node-glob
[less-url]: https://github.com/less/less.js
[watch-url]: https://github.com/floatdrop/gulp-watch

[npm-url]: https://npmjs.org/package/gulp-watch-ejs
[npm-image]: http://img.shields.io/npm/v/gulp-watch-ejs.svg?style=flat

[travis-url]: https://travis-ci.org/bammoo/gulp-watch-ejs
[travis-image]: http://img.shields.io/travis/bammoo/gulp-watch-ejs.svg?style=flat

[coveralls-url]: https://coveralls.io/r/bammoo/gulp-watch-ejs
[coveralls-image]: http://img.shields.io/coveralls/bammoo/gulp-watch-ejs.svg?style=flat

[depstat-url]: https://david-dm.org/bammoo/gulp-watch-ejs
[depstat-image]: http://img.shields.io/david/bammoo/gulp-watch-ejs.svg?style=flat

