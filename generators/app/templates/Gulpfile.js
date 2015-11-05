var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var minify_css = require('gulp-minify-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var reactify = require('reactify');
var browserify = require('browserify');
var watchify = require('watchify');

var resourcesRoot = './client';
var buildRoot = './src/main/resources/public';

function bundle(file, watch) {
    var startTime = new Date().getTime();
    var props = watchify.args;
    props.entries = [resourcesRoot + '/js/' + file];
    props.debug = true;

    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    bundler.transform(reactify);

    function rebundle() {
        var stream = bundler.bundle();
        return stream.on('error', function(error){
			if(error){
				gutil.log(error.message);
			}
		})
        .pipe(source(file))
        .pipe(gulp.dest(buildRoot + '/js'))
        .on('end', function (options) {
            time = (new Date().getTime() - startTime) / 1000;
            gutil.log('Browserified in: ' + time + 's');
        });
    }

    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundling...');
    });

	gutil.log('Done bundling...');
    return rebundle();
}

gulp.task('js', function() {
    return bundle('app.js', false);
});

gulp.task('styles', function() {
    return gulp.src(resourcesRoot + '/sass/*.scss')
            .pipe(sass({ style: 'expanded' }))
            .pipe(gulp.dest(buildRoot + '/css'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minify_css())
            .pipe(gulp.dest(buildRoot + '/css'));
});

gulp.task('watch', function() {
    gulp.watch(resourcesRoot + '/sass/*.scss', ['styles']);
    gulp.watch(resourcesRoot + '/js/*.js', function() {
        bundle('app.js', true);
    });
});

gulp.task('setup', ['styles'], function() {
    return bundle('app.js', false);
});

gulp.task('default', ['styles', 'watch'], function(){
    return bundle('app.js', true);
});
