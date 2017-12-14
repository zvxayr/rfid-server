const gulp      = require('gulp')
const nodemon   = require('gulp-nodemon')
const bs        = require('browser-sync').create()

gulp.task('default', ['nodemon', 'browser-sync', 'watch'])

gulp.task('nodemon', () => {
    nodemon({
        script: 'server.js',
        watch: ['controllers/**.js', 'server.js'],
        env: { 'NODE_ENV': 'development' }
    })
})

gulp.task('browser-sync', () => {
    bs.init({
        proxy: 'localhost:8000',
        open: false
    })
})

gulp.task('watch', () => {
    gulp.watch('public/css/**.css', ({ path }) => gulp.src(path).pipe(bs.stream()))
    gulp.watch('public/js/**.js', ({ path }) => gulp.src(path).pipe(bs.stream()))
    gulp.watch('views/**.html', ({ path }) => gulp.src(path).pipe(bs.stream()))
})