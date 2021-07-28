const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const { series, parallel, src, dest, watch } = require("gulp");

function defaultTask(cb) {
  console.log("Hello");
  cb();
}

function compileSCSS(cb) {
  src("src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(dest("build/css"));

  cb();
}

exports.default = defaultTask;
exports.compile = compileSCSS;
exports.watch = function () {
  watch("src/scss/*.scss", parallel(compileSCSS));
};
