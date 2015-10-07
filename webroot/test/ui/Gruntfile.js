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
        ImageListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ImageListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Image*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/test-results.xml',
                    suite: 'ImageListView',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/image-list-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/ImageListView/'
                }
            }
        },
        PackageListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/PackageListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Package*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/test-results.xml',
                    suite: 'PackageListView',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/package-list-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/PackageListView/'
                }
            }
        },
        ClusterTabView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ClusterTabView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Cluster*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/test-results.xml',
                    suite: 'ClusterTabView',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/cluster-tab-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/ClusterTabView/'
                }
            }
        },
        ServerTabView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ServerTabView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Server*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/server-tab-view-test-results.xml',
                    suite: 'servers',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/server-tab-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/ServerTabView/'
                }
            }
        },
        ClusterListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ClusterListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Cluster*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/cluster-list-view-test-results.xml',
                    suite: 'clusters',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/cluster-list-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/ClusterListView/'
                }
            }
        },
        ServerListView: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ServerListView.test.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Server*.js': ['coverage']
                },
                junitReporter: {
                    outputFile: __dirname + '/reports/server-list-view-test-results.xml',
                    suite: 'servers',
                },
                htmlReporter: {
                    outputFile: __dirname + '/reports/server-list-view-test-results.html'
                },
                coverageReporter: {
                    type : 'html',
                    dir : __dirname + '/reports/coverage/ServerListView/'
                }
            }
        }
    };

    for (var feature in karmaConfig) {
        if (feature != 'options') {
            karmaConfig[feature]['options']['files'] = commonFiles.concat(karmaConfig[feature]['options']['files']);
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON(__dirname + "/../../../../contrail-web-core/package.json"),
        karma: karmaConfig,
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            files: ["Gruntfile.js"]
        },
        sm: {
            ImageListView  : 'ImageListView',
            PackageListView: 'PackageListView',
            ClusterTabView : 'ClusterTabView',
            ClusterListView: 'ClusterListView',
            ServerListView : 'ServerListView',
            ServerTabView  : 'ServerTabView'
        }

    });

    grunt.registerMultiTask('sm', 'Server Manager Test Cases', function () {
        if (this.target == 'ImageListView') {
            grunt.task.run('karma:ImageListView');
        } else if (this.target == 'PackageListView') {
            grunt.task.run('karma:PackageListView');
        } else if (this.target == 'ClusterTabView') {
            // skipped :- page has some timing issues ?
            grunt.task.run('karma:ClusterTabView');
        } else if (this.target == 'ClusterListView') {
            grunt.task.run('karma:ClusterListView');
        } else if (this.target == 'ServerListView') {
            grunt.task.run('karma:ServerListView');
        } else if (this.target == 'ServerTabView') {
            // TODO Monitoring, Inventory grid not
            // getting populated due to data coming from cache
            //grunt.task.run('karma:ServerTabView');
        }
    });
};
