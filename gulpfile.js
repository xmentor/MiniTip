(function(gulp) {
    'use strict';
    
    const sass = require('gulp-sass');
    const autoprefixer = require('gulp-autoprefixer');
    const cssmin = require('gulp-cssmin');
    const eslint = require('gulp-eslint');
    const closureCompiler = require('gulp-closure-compiler');
    const copy = require('gulp-copy');
    
    const jsCompilerOptions = {
        fileName: 'minitip.min.js',
        compilerFlags: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT5_STRICT'
        }
    };

    gulp.task('sass', () => {
        return gulp.src('src/sass/minitip.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist/css'));
    });
    
    gulp.task('autoprefixer', ['sass'], () => {
        return gulp.src('dist/css/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('dist/css'));
    });
    
    gulp.task('cssmin', ['autoprefixer'], () => {
        return gulp.src('dist/css/*.css')
            .pipe(cssmin())
            .pipe(gulp.dest('dist/css'));
    });
    
    gulp.task('eslint', ['cssmin'], () => {
        return gulp.src('src/js/**')
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });
    
    gulp.task('jsCompiler', ['eslint'], () => {
        return gulp.src('src/js/*.js')
            .pipe(closureCompiler(jsCompilerOptions))
            .pipe(gulp.dest('dist/js'));
    });
    
    gulp.task('copy', ['jsCompiler'], () => {
        return gulp.src(['dist/css/**', 'dist/js/**'])
            .pipe(copy('docs', {prefix: 1}));
    });
    
    gulp.task('default', ['copy']);
    
    gulp.watch(['src/js/**', 'src/sass/**'], ['default']);
              
})(require('gulp')); 