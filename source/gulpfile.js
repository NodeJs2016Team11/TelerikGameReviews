var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');

// Task
gulp.task('default', function () {
    // listen for changes
    livereload.listen();
    // configure nodemon
    nodemon({
            script: 'server.js',
            ext: 'js',
            exec: 'nodemon --debug',
        })
        .on('restart', function () {
            setTimeout(function () {
                livereload.changed('app.js');
                gulp.src('app.js')
                    .pipe(livereload())
                    .pipe(plumber())
                    // .on('error', onError)
                    .pipe(notify('Reloading page, please wait...'));
            }, 1000); // 1 second pause
        });

});

//Could be used if not using plumber for error catching and not breaking watch
// function onError(err) {
//     console.log(err);
//     this.emit('end');
// }
