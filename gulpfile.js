var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat		= require('gulp-concat'),
	uglify		= require('gulp-uglify')
	cssnano		= require('gulp-cssnano'),
	rename		= require('gulp-rename');


gulp.task('mytask', function(){
	console.log('Hello Epta')
});

// gulp.task('concat-css', function(){
// 	return 	gulp.src('app/pre-css/*.css')
// 			.pipe(concat('style.css'))
// 			.pipe(gulp.dest('app/css'))
// 			.pipe(browserSync.stream());

// })

gulp.task('sass', function(){
	return gulp.src(['app/sass/**/*.sass', 'app/sass/**/*.scss'])
		.pipe(sass().on('error',sass.logError))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

gulp.task('scripts', function(){
	return gulp.src([
			'app/libs/jquery-2.1.0.min/index.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});
gulp.task('css-libs',['sass'], function(){
	return gulp.src('app/css/style.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function(){
	var files = [
    'app/**/*.html',
    'app/css/**/*.css',
    'app/img/**/*.png',
    'app/img/**/*.svg',
    'app/js/*.js'
  ];
  
	browserSync.init(files, {
		server:{
			baseDir:'app'
		},
		notify: false

	})
});

gulp.task('watch', ['browser-sync','css-libs'],function(){
	gulp.watch(['app/index.html',
				'app/sass/**/*.scss',
				'app/*.html',
				'app/js/*.js'
				],['sass'],browserSync.reload());
	
});

// gulp.task('build', function(){
// 	var buildCss = gulp.src([
// 					'app/css/main.css',
// 					'app/css/main.min.css'
					
// 					])
// });

gulp.task('default', ['watch']);

