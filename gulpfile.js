"use strict";

const gulp = require("gulp");

/* Point to package.json */
const pjson = require("./package.json");

/* Configure the Fractal instance from package.json file */
const fractal = require("@frctl/fractal").create();
const logger = fractal.cli.console;
const config = pjson.config;

fractal.set("project.title", pjson.name);
fractal.web.set("builder.dest", config.paths.build);
fractal.docs.set("path", config.paths.docs);
fractal.components.set("path", config.paths.components);
fractal.web.set("static.path", config.paths.assets);
fractal.web.set("server.sync", true);

gulp.task("fractal:start", async function () {
  const server = fractal.web.server({
    sync: true,
  });
  server.on("error", (err) => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

gulp.task("fractal:build", async function () {
  const builder = fractal.web.builder();
  builder.on("progress", (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, "info")
  );
  builder.on("error", (err) => logger.error(err.message));
  return builder.build().then(() => {
    logger.success("Fractal build completed!");
  });
});

/* End of Fractal */

/* Sass */

const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const path = require("gulp-path");

gulp.task("scss", function (done) {
  return gulp
    .src("./src/assets/scss/**/*.scss")
    .pipe(customPlumber("Error running Sass"))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest("./src/public/css"));
  done();
});

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
    }),
  });
}

gulp.task("watchscss", function (done) {
  gulp.watch(
    ["./src/components/**/*.scss", "./src/assets/scss/*.scss"],
    gulp.series("scss")
  );
  done();
});

/* End of Sass */

/* Start of Js */

gulp.task("watchjs", function (done) {
  gulp.watch(
    ["./src/components/**/*.js", "./src/assets/js/**/*.js"],
    gulp.series("webpackit")
  );
  done();
});

const webpack = require("webpack-stream");
const webpackConfig = require("./webpack.config");
gulp.task("webpackit", function () {
  return (
    gulp
      .src("./src/assets/js/main.js")
      .pipe(
        webpack({
          // Any configuration options...
          config: webpackConfig,
        })
      )
      //.pipe(gulp.dest("./build/"));
      .pipe(gulp.dest("./src/public/js/"))
  );
});

/* End of Js */

/* Copy Files */
// TODO: copy js to ./src/public/js

/* Default Gulp command */
gulp.task(
  "default",
  gulp.series("fractal:start", "scss", "watchscss", "webpackit", "watchjs")
);

/* Build Gulp command  - process scss first, then fractal's build task copies all latest assets */
gulp.task("build", gulp.series("scss", "webpackit", "fractal:build"));

// NOTE: Need to have a task to copy js to ./src/public/js before running webpackit
