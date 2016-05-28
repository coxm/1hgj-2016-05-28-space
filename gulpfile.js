const gulp = require('gulp');
const ts = require('gulp-typescript');


gulp.task('ts', function() {
	gulp.src([
		'typings/main.d.ts',
		'src/util.ts',
		'src/Player.ts',
		'src/main.ts'
	])
	.pipe(ts({
		noImplicitAny: true,
		outFile: 'jam.js',
		target: 'es3',
		module: '',
		declaration: false,
		module: 'none'
	}))
	.pipe(gulp.dest('build'));
});
