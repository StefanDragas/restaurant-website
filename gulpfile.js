var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var jade = require('gulp-jade');
// var jadelint = require('gulp-jadelint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
// var jshint = require('gulp-jshint');
// var jscs = require('gulp-jscs');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var autoprefixer = require('autoprefixer');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var gulp_if = require('gulp-if');
var size = require('gulp-size');
var del = require('del');
var args = require('yargs').argv;
var gulpPrint = require('gulp-print');
var inject = require('gulp-inject');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var csso = require('csso');
var lost = require('lost');
var mqpacker = require('css-mqpacker');
var groupMediaQueries = require('gulp-group-css-media-queries');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var jadeSrc = './index.jade';
var htmlSrc = './index.html';
var sassSrc = './scss/**/*.scss';
var cssSrc = './css/';
var jsSrc = './js/script.js';
var imgSrc = './images/*';

var config = require('./gulp.config')();

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    }
}

function errorLogger(error) {
    lod('START OF ERROR');
    lod(error);
    lod('END OF ERROR');
    this.emit('end');
}

gulp.task('jade', function () {
    return gulp.src(config.jadeSrc)
        .pipe(plumber(plumberErrorHandler))
        .pipe(jade({
            pretty: true
        }))
        // .on('error', errorLogger)
        // .on('error', gutil.log)
        // .pipe(jadelint())
        .pipe(gulp.dest('./'))
        .pipe(reload({
            stream: true
        }));
    /*.pipe(notify({
        message: 'jade sucessfully compiled to html :)', 
        onLast: true
    }));*/
});

// gulp.task('jade-watch', function() {
// 	gulp.watch(jadeSrc, ['jade']);
// });

function clean(path, done) {
    log('Cleaning: ' + gutil.colors.blue(path));
    del(path, done);
}

gulp.task('clean', function (done) {
    var del_config = [].concat(config.build, config.dest);
    log('Cleaning' + gutil.colors.blue(del_config));
    clean(config.build, done);
});

gulp.task('clean:css', function (done) {
    var files = config.cssSrc;
    // del(files);
    clean(files, done);
});

gulp.task('scss', function () {
    var processors = [
        autoprefixer({
            browsers: ['last 2 versions', '> 5%'],
        }),
        lost()/*,
        mqpacker({
            sort: true
        })*/
    ];

    log('Compilling Sass to Css');

    return gulp.src(config.sassSrc)
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        // .on('error', errorLogger))
        // .on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(groupMediaQueries())
        .pipe(gulp.dest(cssSrc))
        .pipe(reload({
            stream: true
        }));
    /*.pipe(size())
    .pipe(notify({
        message: 'scss sucessfully compiled to css :)', 
        onLast: true
    }));*/
});

gulp.task('js', function () {
    return gulp.src(jsSrc)
        // gulp.src(config.jsSrc)
        .pipe(soucemaps.init())
        .pipe(gulp_if(args.verbose, gulpPrint()))
        // .pipe(jscs())
        // .pipe(jshint())
        // .pipe(jshint.reporter('jshint-stylish', {
        //     verbose: true
        // }))
        // .pipe(jshint.reporter('fail'))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(soucemaps.write())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest());
});

gulp.task('clean:images', function (done) {
    var files = config.imgSrc;
    clean(files, done);
});

gulp.task('images', function () {
    log('Compressing and copying images images');

    // return gulp.src(config.src + config.imgSrc + (png | jpg | gif | svg))
    return gulp.src('./src/images/*')
        .pipe(cache(imagemin({})))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('wiredep', function () {
    log('Wiring up the bower css, js and our main js file into the html file.');
    var options = config.getDefaultWiredepOptions();
    var wiredep = require('wiredep').stream();

    return gulp.src(config.htmlSrc)
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(config.jsSrc)))
        .pipe(gulp.dest(config.dist));
});

gulp.task('inject', ['wiredep', 'scss', 'templatecache'], function () {
    log('Wiring up the main css file into the html file, and calling wiredep.');

    return gulp.src(config.htmlSrc)
        .pipe(inject(gulp.src(config.cssSrc)))
        .pipe(gulp.dest(config.dist));
});

gulp.task('optimize', ['inject'], function () {
    log('Optimizing the javascript, css, html');

    var assets = useref.assets({
        searchPath: './'
    });
    var templateCache = config.dist + config.templateCache.file;
    var cssFilter = filter('**/*.css');
    var jsFilter = filter('**/*.js');

    return gulp.src(config.htmlSrc)
        .pipe(plumber())
        .pipe(inject(gulp.src(templateCache, {
            read: false
        }, {
                starttag: '//- inject:js'
            })))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.dist));
});

gulp.task('server', ['scss', 'jade'], function () {
    browserSync.init({
        server: {
            base: './'
        },
        notify: false,
        open: false
    });
});

gulp.task('watch', ['server'], function () {
    gulp.watch(jadeSrc, ['jade']);
    gulp.watch(sassSrc, ['scss']);
    // gulp.watch(config.sassSrc, ['scss']);
    // gulp.watch(jsSrc, ['js']);
    gulp.watch(jsSrc).on('change', browserSync.reload);
});

gulp.task('clean', ['tasks']);

gulp.task('build', ['tasks']);

gulp.task('default', ['watch']);
