/*s
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
/*jshint node:true */
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks('grunt-qunit-junit');
    grunt.loadNpmTasks('grunt-karma');
    //this option is to avoid interruption of test case execution on failure of one in sequence
    //grunt.option('force',true);
    grunt.option('stack', true);

    var commonFiles = [
        {pattern: 'contrail-web-core/webroot/assets/**/!(tests)/*.js', included: false},

        {pattern: 'contrail-web-core/webroot/assets/**/*.css', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.css', included: false},
        {pattern: 'contrail-web-core/webroot/test/ui/**/*.css', included: false},

        {pattern: 'contrail-web-core/webroot/css/**/*.woff', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.ttf', included: false},
        {pattern: 'contrail-web-core/webroot/assets/**/*.woff', included: false},
        {pattern: 'contrail-web-core/webroot/assets/**/*.ttf', included: false},
        {pattern: 'contrail-web-core/webroot/assets/**/*.svg', included: false},
        {pattern: 'contrail-web-core/webroot/assets/**/*.map', included: false},

        {pattern: 'contrail-web-core/webroot/img/**/*.png', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.png', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.gif', included: false},
        {pattern: 'contrail-web-core/webroot/assets/**/*.png', included: false},

        //Everything except library test suites and test files.
        {pattern: 'contrail-web-core/webroot/test/ui/js/**/{!(*.test.js), !(*.lib.test.suite.js)}', included: false},

        {pattern: 'contrail-web-server-manager/webroot/test/ui/sm.test.app.js'},
        {pattern: 'contrail-web-server-manager/webroot/test/ui/*.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/templates/*.tmpl', included: false},
        {pattern: 'contrail-web-server-manager/webroot/common/**/*.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/**/*.tmpl', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/js/**/*.js', included: false},

        {pattern: 'contrail-web-server-manager/webroot/setting/sm/test/**/*.mock.data.js', included: false},

        {pattern: 'contrail-web-server-manager/webroot/*.xml', included: false},

        {pattern: 'contrail-web-core/webroot/js/**/*.js', included: false},
        {pattern: 'contrail-web-core/webroot/templates/*.tmpl', included: false}
    ];

    function browserSubdirFn(browser, platform) {
        // normalization process to keep a consistent browser name
        return browser.toLowerCase().split(' ')[0];
    };

    var karmaConfig = {
        options: {
            configFile: 'karma.config.js',
        },
        imageListView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/views/ImageListView.test.js',
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Image*.js': ['coverage']
                },
                junitReporter: {
                    outputDir: __dirname + '/reports/tests/sm/views/',
                    outputFile: 'image-test-results.xml',
                    suite: 'ImageListView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/image-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/ImageListView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        packageListView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/views/PackageListView.test.js',
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Package*.js': ['coverage']
                },
                junitReporter: {
                    outputDir: __dirname + '/reports/tests/sm/views/',
                    outputFile: 'package-test-results.xml',
                    suite: 'PackageListView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/package-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/PackageListView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        clusterTabView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/views/ClusterTabView.test.js',
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Cluster*.js': ['coverage']
                },
                junitReporter: {
                    outputDir: __dirname + '/reports/tests/sm/views/',
                    outputFile: 'cluster-tab-view-test-results.xml',
                    suite: 'ClusterTabView',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/cluster-tab-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/ClusterTabView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        //serverTabView: {
        //    options: {
        //        files: [
        //            {pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/views/ServerTabView.test.js', included: false}
        //        ],
        //        preprocessors: {
        //            'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Server*.js': ['coverage']
        //        },
        //        junitReporter: {
        //            outputDir: __dirname + '/reports/tests/sm/views/',
        //            outputFile: 'server-tab-view-test-results.xml',
        //            suite: 'servers',
        //            useBrowserName: false
        //        },
        //        htmlReporter: {
        //            outputFile: __dirname + '/reports/tests/sm/views/server-tab-view-test-results.html'
        //        },
        //        coverageReporter: {
        //            type : 'html',
        //            dir : __dirname + '/reports/coverage/sm/views/ServerTabView/',
        //            subdir: browserSubdirFn
        //        },
        //        feature: 'sm'
        //    }
        //},
        clusterListView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/views/ClusterListView.test.js',
                        included: false
                    },
                    {
                        pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/views/ClusterListView.custom.test.suite.js',
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Cluster*.js': ['coverage']
                },
                junitReporter: {
                    outputDir: __dirname + '/reports/tests/sm/views/',
                    outputFile: 'cluster-list-view-test-results.xml',
                    suite: 'clusters',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/cluster-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/ClusterListView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        serverListView: {
            options: {
                files: [
                    {
                        pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/views/ServerListView.test.js',
                        included: false
                    }
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Server*.js': ['coverage']
                },
                junitReporter: {
                    outputDir: __dirname + '/reports/tests/sm/views/',
                    outputFile: 'server-list-view-test-results.xml',
                    suite: 'servers',
                    useBrowserName: false
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/views/server-list-view-test-results.html'
                },
                coverageReporter: {
                    type: 'html',
                    dir: __dirname + '/reports/coverage/sm/views/ServerListView/',
                    subdir: browserSubdirFn
                },
                feature: 'sm'
            }
        },
        //packageModel: {
        //    options: {
        //        files: [
        //            {pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/models/PackageModel.test.js', included: false},
        //            {pattern: 'contrail-web-server-manager/webroot/setting/sm/test/ui/models/PackageModel.custom.test.suite.js', included: false}
        //        ],
        //        preprocessors: {
        //            'contrail-web-server-manager/webroot/setting/sm/ui/js/models/*Model.js': ['coverage']
        //        },
        //        junitReporter: {
        //            outputDir: __dirname + '/reports/tests/sm/models/',
        //            outputFile: 'package-model-test-results.xml',
        //            suite: 'models',
        //            useBrowserName: false
        //        },
        //        htmlReporter: {
        //            outputFile: __dirname + '/reports/tests/sm/models/package-model-test-results.html'
        //        },
        //        coverageReporter: {
        //            type : 'html',
        //            dir : __dirname + '/reports/coverage/sm/models/PackageModel/',
        //            subdir: browserSubdirFn
        //        },
        //        feature: 'sm'
        //    }
        //}
    };

    var allTestFiles = [],
        allSMTestFiles = [];

    for (var target in karmaConfig) {
        if (target != 'options') {
            allTestFiles = allTestFiles.concat(karmaConfig[target]['options']['files']);
            var feature = karmaConfig[target]['options']['feature'];
            if (feature == 'sm') {
                allSMTestFiles = allSMTestFiles.concat(karmaConfig[target]['options']['files']);
            }
            karmaConfig[target]['options']['files'] = commonFiles.concat(karmaConfig[target]['options']['files']);
        }
    }

    karmaConfig['runAllSMTests'] = {
        options: {
            files: [],
            preprocessors: {
                'contrail-web-server-manager/webroot/setting/sm/ui/js/**/*.js': ['coverage'],
                'contrail-web-core/webroot/js/**/*.js': ['coverage']
            },
            junitReporter: {
                outputDir: __dirname + '/reports/tests/sm/',
                outputFile: 'sm-test-results.xml',
                suite: 'sm',
                useBrowserName: false
            },
            htmlReporter: {
                outputFile: __dirname + '/reports/tests/sm/sm-test-results.html'
            },
            coverageReporter: {
                reporters: [
                    {
                        type: 'html',
                        dir: __dirname + '/reports/coverage/sm/',
                        subdir: browserSubdirFn
                    },
                    {
                        type: 'json',
                        dir: __dirname + '/reports/coverage/sm/',
                        subdir: browserSubdirFn
                    }
                ]
            }
        }
    };
    karmaConfig['runAllTests'] = {
        options: {
            files: [],
            preprocessors: {
                'contrail-web-server-manager/webroot/**/ui/js/**/*.js': ['coverage'],
                'contrail-web-core/webroot/js/**/*.js': ['coverage']
            },
            junitReporter: {
                outputDir: __dirname + '/reports/tests/',
                outputFile: 'server-manager-test-results.xml',
                suite: 'serverManager',
                useBrowserName: false
            },
            htmlReporter: {
                outputFile: __dirname + '/reports/tests/server-manager-test-results.html'
            },
            coverageReporter: {
                reporters: [
                    {
                        type: 'html',
                        dir: __dirname + '/reports/coverage/serverManager/',
                        subdir: browserSubdirFn
                    },
                    {
                        type: 'json',
                        dir: __dirname + '/reports/coverage/serverManager/',
                        subdir: browserSubdirFn
                    }
                ]
            }
        }
    };
    // Now add the test files along with common files.
    karmaConfig['runAllSMTests']['options']['files'] = commonFiles.concat(allSMTestFiles);
    karmaConfig['runAllTests']['options']['files'] = commonFiles.concat(allTestFiles);


    grunt.initConfig({
        pkg: grunt.file.readJSON(__dirname + "/../../../../contrail-web-core/package.json"),
        karma: karmaConfig,
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            files: ["Gruntfile.js"]
        },
        smNoMerge: {
            imageListView: 'imageListView',
            packageListView: 'packageListView',
            clusterTabView: 'clusterTabView',
            clusterListView: 'clusterListView',
            serverListView: 'serverListView',
            serverTabView: 'serverTabView'
        }

    });

    function printCoverageReportLoc(reporter) {
        grunt.log.writeln('Coverage Reports: ');
        var reporters = reporter['reporters'] ? reporter['reporters'] : [reporter]
        for (var i = 0; i < reporters.length; i++) {
            grunt.log.writeln('Type: ' + reporters[i]['type']);
            grunt.log.writeln('Dir: ' + reporters[i]['dir']);
        }
    };

    grunt.registerTask('default', function () {
        grunt.warn('No Task specified. \n To run all the tests, run:\n grunt run \n\n ' +
            'To run specific feature (for eg: sm) tests, run:\n grunt run:sm\n    OR \n grunt sm\n\n');
    });

    grunt.registerTask('run', 'Server Manager Test Cases', function (feature) {
        if (feature == null) {
            grunt.log.writeln('>>>>>>>> No feature specified. will run all the feature tests. <<<<<<<');
            grunt.log.writeln('If you need to run specific feature tests only; then run: grunt run:sm\n\n');
            grunt.task.run('karma:runAllTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllTests']['options']['coverageReporter']);
            //grunt.log.writeln('Coverage Report: ' + ['dir']);
        } else if (feature == 'sm') {
            grunt.log.writeln('>>>>>>>> Running Server Monitoring feature tests. <<<<<<<');
            grunt.task.run('karma:runAllSMTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllSMTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllSMTests']['options']['coverageReporter']);
            //grunt.log.writeln('Coverage Report: ' + karmaConfig['runAllSMTests']['options']['coverageReporter']['dir']);
        }
    });

    grunt.registerTask('sm', 'Server Manager Test Cases', function (target) {
        if (target == null) {
            grunt.log.writeln('>>>>>>>> Running Network Monitoring feature tests. <<<<<<<');
            grunt.task.run('karma:runAllSMTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllSMTests']['options']['htmlReporter']['outputFile']);
            printCoverageReportLoc(karmaConfig['runAllSMTests']['options']['coverageReporter']);
            //grunt.log.writeln('Coverage Report: ' + ['reporters']);
        } else if (target == 'imageListView') {
            grunt.task.run('karma:imageListView');
        } else if (target == 'packageListView') {
            grunt.task.run('karma:packageListView');
        } else if (target == 'clusterTabView') {
            // skipped :- page has some timing issues ?
            grunt.task.run('karma:clusterTabView');
        } else if (target == 'clusterListView') {
            grunt.task.run('karma:clusterListView');
        } else if (target == 'serverListView') {
            grunt.task.run('karma:serverListView');
        } else if (target == 'serverTabView') {
            // TODO Monitoring, Inventory grid not
            // getting populated due to data coming from cache
            //grunt.task.run('karma:ServerTabView');
        } else if (target == 'packageModel') {
            //    grunt.task.run('karma:packageModel');
        } else if (target == 'runAllNoMerge') {
            grunt.log.writeln('>>>>>>> Running all Network Monitoring tests one by one. Results will not be Merged. <<<<<<');
            grunt.task.run(['karma:imageListView', 'karma:packageListView', 'karma:clusterTabView',
                'karma:clusterListView', 'karma:serverListView']);
        }
    });
};
