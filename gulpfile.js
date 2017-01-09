const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('styles',() => {
	return gulp.src('dev/css/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions','safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('public/css/'))
		.pipe(reload({stream: true}))
});

gulp.task('scripts', () => {
	return gulp.src('dev/js/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('public/js/'))
	.pipe(reload({stream: true}))
})

gulp.task('browser-sync', () => {
	browserSync.init({
		server:'.'
	})
})


gulp.task('watch', () => {
	gulp.watch('dev/css/*.scss', ['styles'])
	gulp.watch('dev/js/*.js', ['scripts'])
	gulp.watch('index.html', reload);
});


gulp.task('default', ['browser-sync', 'scripts', 'styles', 'watch'])
