var { dest, parallel, series, src } = require('gulp');
var libCleanCss = require('gulp-clean-css');
var libDel = require('del');
var libSass = require('gulp-sass');
var libUglify = require('gulp-uglify');
var libStylelint = require('gulp-stylelint');

var pathBuild = './public/build';


// Init the directory build if not exists
function init() {
    return src('*.*', {read: false})
        .pipe(dest(pathBuild))
}

// Clean the directory build
function clean() {
  return libDel([
    pathBuild + '/**', 
    '!' + pathBuild
  ]);
}

// Copy libraries
function importLib() {
  return src([
    // jQuery
    './node_modules/jquery/dist/jquery.min.js',
    // Semantic UI
    './node_modules/semantic-ui-css/semantic.min.js',
    './node_modules/semantic-ui-css/semantic.min.css',
    // Semantic UI Calendar
    './node_modules/semantic-ui-calendar/dist/calendar.min.js',
    './node_modules/semantic-ui-calendar/dist/calendar.min.css',
    // Tablesort
    './node_modules/tablesort/dist/tablesort.min.js',
    // Leaflet
    './node_modules/leaflet/dist/leaflet.js',
    './node_modules/leaflet/dist/leaflet.css',
    './node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
    './node_modules/leaflet.markercluster/dist/MarkerCluster.css',
    './node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
    './node_modules/@mapbox/leaflet-omnivore/leaflet-omnivore.min.js',
    './node_modules/leaflet-draw/dist/leaflet.draw.js',
    './node_modules/leaflet-draw/dist/leaflet.draw.css', // images
    // FullCalendar
    './node_modules/moment/min/moment-with-locales.min.js',
    './node_modules/fullcalendar/dist/fullcalendar.min.js',
    './node_modules/fullcalendar/dist/locale-all.js',
    // c3.js
    './node_modules/d3/dist/d3.min.js',
    './node_modules/c3/c3.min.js',
    './node_modules/c3/c3.min.css',
  ])
  .pipe(dest(pathBuild + '/lib/'));
}

// Copy statics for Semantic UI
function importLibSemanticUiStatics() {
  return src('node_modules/semantic-ui-css/themes/default/**/*.*', {
    base: 'node_modules/semantic-ui-css/'
  })
  .pipe(dest(pathBuild + '/lib'));
}

// Copy images for Leaflet
function importLibLeafletImages() {
  return src('node_modules/leaflet/dist/images/**/*.*', {
    base: 'node_modules/leaflet/dist/images/'
  })
  .pipe(dest(pathBuild + '/lib/images'));
}

// Copy images for Leaflet Draw
function importLibLeafletDrawImages() {
  return src('node_modules/leaflet-draw/dist/images/**/*.*', {
    base: 'node_modules/leaflet-draw/dist/images/'
  })
  .pipe(dest(pathBuild + '/lib/images'));
}

function cssTranspile() {
  return src('./assets/css/*.scss')
    .pipe(libSass({
      includePaths: [],
      outputStyle: 'compact'
    }))
    .pipe(dest(pathBuild + '/css'));
}

function cssMinify() {
  return src(pathBuild + '/css/*.css')
    .pipe(libCleanCss())
    .pipe(dest(pathBuild + '/css'));
}

function jsMinify() {
  return src('assets/js/*.js')
    .pipe(libUglify())
    .pipe(dest(pathBuild + '/js'));
}

function lintSCSS() {
  return src('assets/css/*.scss')
    .pipe(libStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
}

exports.default = series(
    init,
    clean, 
    parallel(importLib, importLibSemanticUiStatics, importLibLeafletImages, importLibLeafletDrawImages),
    cssTranspile,
    parallel(cssMinify, jsMinify)
);

exports.lintSCSS = series(
  lintSCSS
);
