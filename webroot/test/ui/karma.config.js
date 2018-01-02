/*/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
module.exports = function (config) {
    config.set({
        basePath: __dirname + "/../../../..",
        autoWatch: false,
        frameworks: ["requirejs", "qunit", "sinon"],
        plugins: [
            "karma-phantomjs-launcher",
            "karma-coverage",
            "karma-qunit",
            "karma-sinon",
            "karma-htmlfile-reporter",
            //'karma-html-reporter',
            "karma-requirejs",
            "karma-junit-reporter",
            "karma-html2js-preprocessor",
            "karma-firefox-launcher",
            "karma-chrome-launcher",
        ],
        browsers: [
             'ChromeHeadless'
	     // "PhantomJS"
            //'Firefox',
            //'Chrome'
        ],
        exclude: [
            "**/node_modules/**/*.test.js",
        ],
        //port: 8143,

        reporters: ["progress", "html", "coverage", "junit"],
        // the default configuration
        junitReporter: {
            outputDir: __dirname + "/reports/tests/",
            outputFile: "test-results.xml",
            suite: ""
        },
        preprocessors: {
            "*.view": ["html2js"],
            "*.tmpl": ["html2js"]
        },
        htmlReporter: {
            outputFile: __dirname + "/reports/tests/test-results.html"
        },
        coverageReporter: {
            type : "html",
            dir : __dirname + "/reports/coverage/"
        },
        singleRun: true,
        colors: true,
        captureTimeout: 60000,
        browserNoActivityTimeout: 60000,
        logLevel: config.LOG_INFO
    });
};

