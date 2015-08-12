/*
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
        {pattern: 'contrail-web-core/webroot/assets/**/*.js', included: false},

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

        {pattern: 'contrail-web-core/webroot/test/ui/**/*.js', included: false},

        {pattern: 'contrail-web-server-manager/webroot/test/ui/sm.test.app.js'},
        {pattern: 'contrail-web-server-manager/webroot/test/ui/*.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/templates/*.tmpl', included: false},
        {pattern: 'contrail-web-server-manager/webroot/common/**/*.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/**/*.tmpl', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/js/**/*.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ImageListViewMockData.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/PackageListViewMockData.js', included: false},
        {pattern: 'contrail-web-server-manager/webroot/*.xml', included: false},

        {pattern: 'contrail-web-core/webroot/js/**/*.js', included: false},
        {pattern: 'contrail-web-core/webroot/templates/*.tmpl', included: false}
    ];

    var karmaConfig = {
        options: {
            configFile: 'karma.config.js',
        },
        images: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/ImageListViewTest.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Image*.js': ['coverage']
                }
            }
        },
        packages: {
            options: {
                files: [
                    {pattern: 'contrail-web-server-manager/webroot/setting/sm/ui/test/ui/PackageListViewTest.js', included: false}
                ],
                preprocessors: {
                    'contrail-web-server-manager/webroot/setting/sm/ui/js/**/Package*.js': ['coverage']
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
            packages: 'packages',
            images: 'images'
        }

    });

    grunt.registerMultiTask('sm', 'Server Manager Test Cases', function () {
        if (this.target == 'packages') {
            grunt.task.run('karma:packages');

        } else if (this.target == 'images'){
            grunt.task.run('karma:images');
        }
    });
};
