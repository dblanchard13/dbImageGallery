var gulp    = require('gulp');
var sync    = require('run-sequence');
var browser = require('browser-sync');
var webpack = require('webpack-stream');

/*
  Map of paths for using with the tasks below
 */
var paths = {
  entry: 'js/index.js',
  dest: 'public'
};

gulp.task('build', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('serve', function() {
  // By invoking browser-sync immediately instead of using one of its methods, we initiate a singleton object
  browser({
    // Serves a Browser Sync specific UI for editing connections/mirroring across devices/etc.
    ui: {
      port: 3600
    },
    port: process.env.PORT || 9999,
    // Automatically opens a browser at http://localhost:4500 on server startup
    open: true,
    // Stops inputs from being mirrored on other devices
    ghostMode: false,
    // Gives the path from which to statically serve the app
    server: {
      baseDir: 'public'
    }
  });
});

/*
  Task to watch files for changes and call build and copy tasks
 */
gulp.task('watch', function() {
  gulp.watch(paths.entry, ['build', browser.reload]);
});


gulp.task('default', function(done) {
  sync('build', 'serve', 'watch', done)
});
