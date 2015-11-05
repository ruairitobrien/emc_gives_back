var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')({lazy: true});
var bower = require('bower');
var sh = require('shelljs');
var _ = require('lodash');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var paths = {
    sass: ['./scss/**/*.scss', './www/src/**/*.scss'],
    js: ['./www/src/**/*.module.js',
        './www/src/**/*.js',
        '!./www/src/**/*.spec.js'
    ],
    templates: ['./www/src/**/*.html']
};

gulp.task('help', $.taskListing);

// Builds sass, template cache and injects scripts to index.html
gulp.task('default', ['help']);

gulp.task('build', ['inject', 'templatecache']);

// Continuously build assets and update index if needed
gulp.task('watch', function () {
    gulp.watch([].concat(paths.sass, paths.js, paths.templates), ['build']);
});


gulp.task('sass', function (done) {
     gulp.src(['./scss/ionic.app.scss', './www/src/**/*.scss'])
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe($.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe($.rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('imagemin', function () {
    return gulp.src('www/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('www/img/'));
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', [], function (done) {
    return gulp
        .src(paths.templates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            'templates.js',
            {
                module: 'givesBack',
                standAlone: false
            }
        ))
        .pipe(gulp.dest('www/js'), done);
});

gulp.task('inject', ['sass'], function () {
    return gulp
        .src('./www/index.html')
        .pipe(inject(paths.js,
            '',
            {
                read: false,
                relative: true
            },
            [
                '**/app.module.js',
                '**/*.module.js',
                '**/*.js'
            ]
        ))
        .pipe(inject('./www/css/**/*.min.css', '', {read: false, relative: true}))
        .pipe(gulp.dest('./www'));
});

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Object} options The options for injection
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, options, order) {
    if (label) {
        options.name = 'inject:' + label;
    }

    return $.inject(orderSrc(src, order), options);
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc(src, order) {
    return gulp
        .src(src)
        .pipe($.if(order, $.order(order)));
}



