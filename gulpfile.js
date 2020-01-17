const gulp = require('gulp');
const gulp_concat = require('gulp-concat');
const minify_css = require('gulp-cssmin');
const gulp_uglify = require('gulp-uglify-es');
const gulp_sass = require('gulp-sass');
const gulp_ejs = require('gulp-watch-ejs')
const browser_sync = require('browser-sync');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const imagemin = require('gulp-imagemin');
const del = require('del');

const folder = {}
folder.src = './src'
folder.dist = './dist'
folder.dist_css = `${folder.dist}/css`
folder.dist_js = `${folder.dist}/js`
folder.dist_html = `${folder.dist}/html`
folder.dist_img = `${folder.dist}/images`
folder.dist_views = `${folder.dist}/views`

gulp.task('clean', () => {
    del.sync([`${folder.dist}/**/*`])
})

gulp.task('html', () => {
    return gulp.src(`${folder.src}/views/**/*.ejs`)
        .pipe(gulp_ejs(`${folder.src}/views/**/*.ejs`))
        .pipe(gulp.dest(folder.dist_html))
        .pipe(browser_sync.reload({stream: true}))
})

gulp.task('style', () => {
    return gulp.src(`${folder.src}/assets/styles/**/*.scss`)
        .pipe(gulp_sass())
        .pipe(minify_css())
        .pipe(gulp_concat("style.min.css"))
        .pipe(gulp.dest(folder.dist_css))
        .pipe(browser_sync.reload({stream: true}))
})

gulp.task('js', () => {
    return gulp.src(`${folder.src}/assets/js/**/*.js`)
        .pipe(gulp_uglify.default())
        .pipe(rollup({plugins: [babel(), resolve(), commonjs()]}, 'umd'))
        .pipe(gulp.dest(folder.dist_js))
        .pipe(browser_sync.reload({stream: true}))
})

gulp.task('images', () => {
    return gulp.src(`${folder.src}/assets/images/**/*`)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest(folder.dist_img))
})

gulp.task('browser-sync', () => {
    browser_sync.init({
        server: {
            baseDir: 'dist/',
            directory: true,
        },
        notify: false,
        open: false,
        port: 3000
    })
})

gulp.task('watch', () => {
    gulp.watch(`${folder.src}/assets/styles/`, gulp.parallel('style'))
    gulp.watch(`${folder.src}/views`, gulp.parallel('html'))
    gulp.watch(`${folder.src}/assets/js/`, gulp.parallel('js'))
    gulp.watch(`${folder.src}/assets/images`, gulp.parallel('images'))
})

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'js', 'style', 'html', 'images'))
