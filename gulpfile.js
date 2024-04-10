"use strict";

const fs = require("fs");

const webpackStream = require("webpack-stream");
const webpack4 = require("webpack");

const gulpif = require("gulp-if");
const sass = require("gulp-sass")(require("sass"));
const less = require("gulp-less");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const cleancss = require("gulp-clean-css");
const filelist = require("gulp-filelist");
const rename = require("gulp-rename");
const rsync = require("gulp-rsync");
const zip = require("gulp-zip");
const extender = require("gulp-html-extend");
const cachebust = require("gulp-cache-bust");
const htmlclean = require("gulp-htmlclean");
const replace = require("gulp-replace");

const server = require("browser-sync").create();
const autoprefixer = require("autoprefixer");
const del = require("del");
const clc = require("cli-color");

const pkg = require("./package.json");
const { series, parallel, src, dest, watch } = require("gulp");

const logWarning = (message) => {
    console.log(clc.yellow(message));
};
const logSuccess = (message) => {
    console.log(clc.green(message));
};
const logError = (message) => {
    console.log(clc.red(message));
};

const production = process.env.NODE_ENV === "production";
const flagDelay = process.env.npm_config_delay || 10000;
const flagFile = process.env.npm_config_file;

let isBuildHtmlRunned = false;

if (pkg.name === "project-name") {
    logWarning(
        "Warning! Project has a default name. Change it in package.json"
    );
}

if (pkg.repository.url === "") {
    logWarning(
        `Warning! The repository url is not specified. 
If you are not planning share with repository, everything is fine. 
Otherwise, fill repository.url in package.json.`
    );
}

const assets = [
    "./src/img/**",
    "./src/fonts/**/*",
    "./src/video/**/*",
    "./src/data/**/*",
    "./src/robots.txt",
];

function clean(cb) {
    return del("./public/");
}

function buildAssets(cb, path) {
    const source = path || assets;

    return src(source, { base: "src/" }).pipe(dest("./public"));
}

function buildHtml(cb) {
    const baseDir = "./src/markup/";

    const isLimitedMode = isBuildHtmlRunned && flagFile;
    const pattern = isLimitedMode ? flagFile : "*.html";
    const source = baseDir + pattern;

    if (isLimitedMode) {
        logWarning(
            `Warning! Only ${source} will be rebuilded, because --file flag was determined.`
        );
    }

    isBuildHtmlRunned = true;

    return src(baseDir + pattern)
        .pipe(extender({ annotations: false, verbose: false }))
        .pipe(cachebust({ type: "timestamp" }))
        .pipe(replace(/(woff2\?t=\d+)/g, "woff2"))
        .pipe(gulpif(production, htmlclean()))
        .pipe(
            gulpif(
                production,
                replace(
                    /(css|js)\/(?!.+?min\.(css|js))(.+?).(css|js)/gm,
                    "$1/$3.min.$4"
                )
            )
        )
        .pipe(dest("./public"));
}

function buildStyles(cb) {
    return src(["src/styles/*.*", "!src/styles/_*.*"])
        .pipe(gulpif(production, sourcemaps.init()))
        .pipe(
            gulpif(
                "*.scss",
                sass({
                    importer: require("node-sass-tilde-importer"),
                }).on("error", sass.logError)
            )
        )
        .pipe(gulpif("*.less", less()))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest("public/css/"))
        .pipe(gulpif(production, cleancss()))
        .pipe(
            gulpif(
                production,
                rename({
                    suffix: ".min",
                })
            )
        )
        .pipe(gulpif(production, sourcemaps.write(".")))
        .pipe(gulpif(production, dest("public/css/")))
        .pipe(server.stream());
}

function buildScripts(cb) {
    const config = require("./webpack.config.js");
    config.mode = process.env.NODE_ENV;

    return src("src/js/main.js")
        .pipe(webpackStream(config, webpack4))
        .pipe(dest("public/js/"));
}

// required for pagelist
function buildConfig(cb) {
    const content = {
        repoUrl: pkg.repository.url,
        zipUrl: "http://html.ildar-meyker.ru/" + pkg.name + "/archive.zip",
    };

    fs.writeFile("./public/config.json", JSON.stringify(content), cb);
}

// required for pagelist
function buildPagelist(cb) {
    return src("src/markup/*.html")
        .pipe(filelist("pagelist.json", { flatten: true }))
        .pipe(dest("./public"));
}

function watchFiles(cb) {
    watch(
        "./src/markup/**/*.html",
        { delay: flagDelay },
        series(buildHtml, reload)
    );
    watch(assets, { delay: flagDelay })
        .on("add", (path) => {
            logSuccess(`File ${path} was added`);
            buildAssets(null, path);
            reload(cb);
        })
        .on("change", (path) => {
            logSuccess(`File ${path} was updated`);
            buildAssets(null, path);
            reload(cb);
        });
    watch("./src/styles/**/*", { delay: flagDelay }, series(buildStyles));
    watch("./src/js/**/*", { delay: flagDelay }, series(buildScripts, reload));
}

function reload(cb) {
    server.reload();
    cb();
}

function runServer(cb) {
    server.init({
        server: {
            baseDir: "public/",
        },
        codeSync: true,
        ghostMode: false,
    });
    cb();
}

function compress(cb) {
    return src("./public/**").pipe(zip("archive.zip")).pipe(dest("./public/"));
}

function deploy(cb) {
    if (pkg.name === "project-name") {
        throw new Error(
            clc.red("Project has a default name. Change it in package.json")
        );
    }

    const config = require("./.deploy-config.json");

    return src("./public/**").pipe(
        rsync({
            root: "public/",
            ...config,
            destination: config.destination + pkg.name + "/",
        })
    );
}

const buildAll = series(
    parallel(buildAssets, buildHtml, buildStyles, buildScripts),
    buildPagelist,
    buildConfig
);

const browse = parallel(runServer, watchFiles);

exports.watch = series(clean, buildAll, browse);
exports.build = series(clean, buildAll);
exports.push = series(clean, buildAll, compress, deploy);
