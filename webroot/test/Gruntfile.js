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
        {pattern: 'views/**/*.view', included: false},
        {pattern: 'common/**/*.js', included: false},
        {pattern: 'setting/**/*.js', included: false},
        {pattern: 'setting/**/*.tmpl', included: false},

        {pattern: 'test/common/sm.test.app.js'},
        {pattern: 'test/common/*.js', included: false},

        {pattern: 'test/*.js', included: false},


        {pattern: 'assets/**/*.js', included: false},
        {pattern: 'js/**/*.js', included: false},
        {pattern: 'css/**/*.css', included: false}

    ];
    var karmaCfg = {
        options     : {
            configFile: 'karma.conf.js',
        },
        smgr        : {
            options: {
                files: []
            }
        },
        image_smgr  : {
            options: {
                files: [
                    {pattern: 'test/unit-tests/image/*.js', included: false}
                ]
            }
        },
        package_smgr: {
            options: {
                files: [
                    {pattern: 'test/unit-tests/package/*.js', included: false}
                ]
            }
        }
    };

    /* Start - Create all target that will run unit test cases from all features */
    var allCfg = {'options': {
        files        : commonFiles,
        preprocessors: {}
    }};
    for (var feature in karmaCfg) {
        if (feature != 'options') {
            allCfg['options']['files'] = allCfg['options']['files'].concat(karmaCfg[feature]['options']['files']);
            for (var path in karmaCfg[feature]['options']['preprocessors'])
                allCfg['options']['preprocessors'][path] = karmaCfg[feature]['options']['preprocessors'][path];
            karmaCfg[feature]['options']['files'] = commonFiles.concat(karmaCfg[feature]['options']['files']);
        }
    }
    karmaCfg['all'] = allCfg;
    /* End - Create all target that will run unit test cases from all features */

    grunt.initConfig({
        pkg   : grunt.file.readJSON(__dirname + "/../../../contrail-web-core/package.json"),
        karma : karmaCfg,
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            files  : [ "Gruntfile.js"]
        },
    });
};