var gulp = require('gulp'),
	less = require('gulp-less'),
	cssmin = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	clean = require('gulp-clean');

//less
gulp.task('testLess' , function () {
	return gulp.src('res/less/**/*.less')
	.pipe(less())
	.on('error', function(err) {
		gutil.log('Less Error!', err.message);
		this.end();
	})
	.pipe(autoprefixer())
	.pipe(cssmin())
	.pipe(gulp.dest('dist/assets/css'));
});

//clean
gulp.task('clean' , function (){
	return gulp.src(['dist/assests/css','dist/assests/js','dist/assests/images'],{read : false})
	.pipe(clean());
});

//default
gulp.task('default' , ['clean'] ,function (){
	gulp.start('testLess','watch');
});

//watch
gulp.task('watch' , function () {
	gulp.watch('res/less/**/*.less',['testLess']);
})
