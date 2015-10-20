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

        {pattern: 'contrail-web-core/webroot/font/**/*.woff', included: false},
        {pattern: 'contrail-web-core/webroot/assets/**/*.woff', included: false},
        {pattern: 'contrail-web-core/webroot/assets/**/*.ttf', included: false},

        {pattern: 'contrail-web-core/webroot/img/**/*.png', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.png', included: false},
        {pattern: 'contrail-web-core/webroot/assets/select2/styles/**/*.png', included: false},
        {pattern: 'contrail-web-core/webroot/css/**/*.gif', included: false},

        //Everything except library test suites and test files.
        {pattern: 'contrail-web-core/webroot/test/ui/js/**/{!(*.test.js), !(*.lib.test.suite.js)}', included: false},

        {pattern: 'contrail-web-server-manager/webroot/test/ui/sm.test.app.js'},
        {pattern: 'contrail-web-server-manager/webroot/test/ui/*.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/templates/*.tmpl', included: false},
        {pattern: 'contrail-web-server-manager/webroot/common/**/*.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/**/*.tmpl', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/js/**/*.js', included: false},

        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ImageListView.mock.data.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/PackageListView.mock.data.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ClusterListView.mock.data.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ClusterTabView.mock.data.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ServerListView.mock.data.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ServerTabView.mock.data.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/*.xml', included: false},

        {pattern: 'contrail-web-core/webroot/js/**/*.js', included: false},
        {pattern: 'contrail-web-core/webroot/templates/*.tmpl', included: false}
    ];

    var karmaConfig = {
        options: {
            configFile: 'karma.config.js',
        },
        imageListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ImageListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Image*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/image-test-results.xml',
                    suite: 'ImageListView',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/image-list-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/sm/ImageListView/'
                },
                feature: 'sm'
            }
        },
        packageListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/PackageListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Package*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/package-test-results.xml',
                    suite: 'PackageListView',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/package-list-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/sm/PackageListView/'
                },
                feature: 'sm'
            }
        },
        clusterTabView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ClusterTabView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Cluster*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/cluster-tab-view-test-results.xml',
                    suite: 'ClusterTabView',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/cluster-tab-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/sm/ClusterTabView/'
                },
                feature: 'sm'
            }
        },
        //serverTabView: {
        //    options: {
        //        files: [
        //            {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ServerTabView.test.js', included: false}
        //        ],
        //        preprocessors: {
        //            'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Server*.js': ['coverage']
        //        },
        //        junitReporter: {
        //            outputFile: __dirname + '/reports/tests/server-tab-view-test-results.xml',
        //            suite: 'servers',
        //        },
        //        htmlReporter: {
        //            outputFile: __dirname + '/reports/tests/server-tab-view-test-results.html'
        //        },
        //        coverageReporter: {
        //            type : 'html',
        //            dir : __dirname + '/reports/coverage/ServerTabView/'
        //        }
        //    }
        //},
        clusterListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ClusterListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Cluster*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/cluster-list-view-test-results.xml',
                    suite: 'clusters',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/cluster-list-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/sm/ClusterListView/'
                },
                feature: 'sm'
            }
        },
        serverListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ServerListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Server*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/tests/sm/server-list-view-test-results.xml',
                    suite: 'servers',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/tests/sm/server-list-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/sm/ServerListView/'
                },
                feature: 'sm'
            }
        }
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
        options:{
            files: [],
            preprocessors: {
                'contrail-web-server-manager/webroot/setting/sm/ui/js/**/*.js': ['coverage']
            },
            junitReporter: {
                outputFile: __dirname + '/reports/tests/sm-test-results.xml',
                suite: 'sm',
            },
            htmlReporter: {
                outputFile: __dirname + '/reports/tests/sm-test-results.html'
            },
            coverageReporter: {
                type : 'html',
                dir : __dirname + '/reports/coverage/sm/'
            }
        }
    };
    karmaConfig['runAllTests'] = {
        options:{
            files: [],
            preprocessors: {
                'contrail-web-server-manager/webroot/setting/sm/ui/js/**/*.js': ['coverage']
            },
            junitReporter: {
                outputFile: __dirname + '/reports/tests/server-manager-test-results.xml',
                suite: 'serverManager',
            },
            htmlReporter: {
                outputFile: __dirname + '/reports/tests/server-manager-test-results.html'
            },
            coverageReporter: {
                type : 'html',
                dir : __dirname + '/reports/coverage/serverManager/'
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
            imageListView  : 'imageListView',
            packageListView: 'packageListView',
            clusterTabView : 'clusterTabView',
            clusterListView: 'clusterListView',
            serverListView : 'serverListView',
            serverTabView  : 'serverTabView'
        }

    });

    grunt.registerTask('default', function() {
        grunt.warn('No Task specified. \n To run all the tests, run:\n grunt runAllTests \n\n ' +
            'To run specific feature (for eg: sm) tests, run:\n grunt runAllTests:sm\n    OR \n grunt sm\n\n');
    });

    grunt.registerTask('runAllTests', 'Server Manager Test Cases', function(feature) {
        if (feature == null) {
            grunt.log.writeln('>>>>>>>> No feature specified. will run all the feature tests. <<<<<<<');
            grunt.log.writeln('If you need to run specific feature tests only; then run: grunt runAllTests:sm\n\n');
            grunt.task.run('karma:runAllTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllTests']['options']['htmlReporter']['outputFile']);
            grunt.log.writeln('Coverage Report: ' + karmaConfig['runAllTests']['options']['coverageReporter']['dir']);
        } else if(feature == 'sm') {
            grunt.log.writeln('>>>>>>>> Running Server Monitoring feature tests. <<<<<<<');
            grunt.task.run('karma:runAllSMTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllSMTests']['options']['htmlReporter']['outputFile']);
            grunt.log.writeln('Coverage Report: ' + karmaConfig['runAllSMTests']['options']['coverageReporter']['dir']);
        }
    });

    grunt.registerTask('sm', 'Server Manager Test Cases', function (target) {
        if (target == null) {
            grunt.log.writeln('>>>>>>>> Running Network Monitoring feature tests. <<<<<<<');
            grunt.task.run('karma:runAllSMTests');
            grunt.log.writeln('Test results: ' + karmaConfig['runAllSMTests']['options']['htmlReporter']['outputFile']);
            grunt.log.writeln('Coverage Report: ' + karmaConfig['runAllSMTests']['options']['coverageReporter']['dir']);
        }else if (target == 'imageListView') {
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
        } else if (target == 'runAllNoMerge') {
            grunt.log.writeln('>>>>>>> Running all Network Monitoring tests one by one. Results will not be Merged. <<<<<<');
            grunt.task.run(['karma:imageListView', 'karma:packageListView', 'karma:clusterTabView',
                'karma:clusterListView', 'karma:serverListView']);
        }
    });
};
