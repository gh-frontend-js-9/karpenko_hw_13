'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var vinyl = require('vinyl-file');
var ejs = require('ejs');
var path = require('path');
var watch = require('gulp-watch');

var PLUGIN_NAME = 'gulp-ejs';

// Name of the event fired when @imports cause file to change
// (Overwrites the current file.event set by gulp-watch/gaze)
var changeEvent = 'changed:by:import';

// Tracks watch streams e.g. `{filepath}: stream`
var _streams = Object.create(null);

var watchIncludes = function(filePath, content, cb, pipeCb) {
  
  var reg = /<%+.*include\s+(\S*)\s*%>/g;

  var matches, incList = [], oldIncList;
  while (matches = reg.exec(content)) {
    var pa = path.join(path.dirname(filePath), matches[1]);
    incList.push(pa);
  }
  incList = incList
    // In case including a sub template many times
    .filter(function(v, i, s) {
      return s.indexOf(v) === i;
    })
    // Sort for checking below
    .sort();
  // If a previous watch stream is active...
  var watchStream = _streams[filePath];
  if(watchStream) {
    oldIncList = watchStream._incList;

    // Check to ensure the @import arrays are identical.
    if(oldIncList.length && oldIncList.join() === incList.join()) {
      pipeCb(); return; // Don't do anything further!
    }

    // Clean up previous watch stream
    watchStream.end();
    watchStream.unpipe();
    watchStream.close();
    delete _streams[filePath];
  }
  if(incList.length) {
    // Generate new watch stream
    watchStream = _streams[filePath] = watch(incList, {}, cb);

    // Expose @import list on the stream
    watchStream._incList = incList;
  }
  pipeCb();
}



module.exports = function (glob, options, settings, callback) {
  settings = settings || {};
  options = options || {};
  if(typeof settings.ext === "undefined")
    settings.ext = ".html";

  // No-op callback if not given
  if(!callback) { callback = function() {}; }
  // Generate a basic `gulp-watch` stream
  var watchStream = watch(glob, {name: 'EJS'}, callback)

  var importPipe = function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported')
      );
    }

    options = file.data || options;
    options.filename = file.path;

    var filePath = file.path;
    var fileBase = file.base;
    var content = file.contents.toString();

    // Edit by reference
    var fileCompile = function(file) {
      file.contents = new Buffer(
        ejs.render(content, options)
      );
      file.path = gutil.replaceExtension(file.path, settings.ext);
    }

    try {
      fileCompile(file)
    } catch (err) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, err.toString()));
    }

    this.push(file);

    // Make sure not watch again when `watchStream.push(f)`
    if(file.event !== changeEvent) {
      watchIncludes(filePath, content, function() {
        // Re push changed less
        vinyl.read(filePath, options, function(err, f) {
          if (err) {
            return watchStream.emit('error', err);
          }
          f.event = changeEvent;
          fileCompile(f);
          f.base = fileBase;
          watchStream.push(f);
          callback(f);
        });
      },
      cb);
    }
    else
      cb();
  }

  // Close all import watch streams when the watchStream ends
  watchStream.on('end', function() { Object.keys(_streams).forEach(closeStream); });

  // Pipe the watch stream into the imports watcher so whenever any of the
  // files change, we re-generate our @import watcher so removals/additions
  // are detected
  watchStream.pipe(through.obj(importPipe));

  return watchStream;
};