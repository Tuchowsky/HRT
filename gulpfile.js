//Requires

let gulp = require('gulp');
    uglify = require('gulp-uglify');
    browserSync = require('browser-sync');
    reload = browserSync.reload;
    sass = require('gulp-sass');
    rename = require('gulp-rename');
    plumber = require('gulp-plumber');
    clean = require('gulp-clean');
    del = require('del');
    babel = require('gulp-babel');
    mustache = require("gulp-mustache");

//Scripts
gulp.task('scripts', function(){
    gulp.src([
        'app/scripts/**/*.js',
        '!app/scripts/**/*.min.js'
    ])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/scripts'))
    .pipe(reload({stream: true}));
});

//Watch Tasks
gulp.task('watch' ,['browser-sync'], function(){
    gulp.watch(
        'app/scripts/*.js',
        ['scripts']
    );
    gulp.watch(
        'app/scss/styles/*.scss',
        ['sass']
    );
    gulp.watch(
        'app/templates/**/*.mustache',
        ['mustache']
    );
    gulp.watch(
        'app/**/*.html',
        ['html']
    );
    
});

//Sass Tasks
gulp.task('sass', function () {
    gulp.src('app/scss/styles/**/*.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('app/css/styles'))
        .pipe(reload({stream: true}));
});

//HTML Tasks
gulp.task('html', function(){
    gulp.src('app/**/*.html')
    .pipe(reload({stream: true}));
});
   
//Mustache Tasks
gulp.task('mustache', function() {
    gulp.src("app/templates/*.mustache")
    .pipe(mustache({
    },{
        extension: '.html'
    },{
        file_1: 'partial/*.mustache'
    }))
    .pipe(gulp.dest("app/"));

});


// clean out all files and folders from build folder
gulp.task('build:cleanfolder', function () {
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest('build/'));
});

gulp.task('build:clean', function(){
    return gulp.src('build/', {read: false})
        .pipe(clean());
});

// task to create build directory of all files
gulp.task('build:copy',['build:clean'], function(){
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', function () {
    
});

gulp.task('build', ['build:cleanfolder', 'build:copy'], function(){
    return del(
        ['build/scss', 'build/css/styles/!(main.css)', 'build/scripts/!(*.min.js)', 'build/templates'],{force: true}
    );
});


//BrowserSync Tasks
gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir: './app'
        }
    });
});

//Default Tasks
gulp.task('default', 
        [
            'scripts',
            'sass',
            'mustache',
            'html',
            'browser-sync',
            'watch',
            'build'
        ]);