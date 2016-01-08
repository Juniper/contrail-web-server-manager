/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smwc, smwgc, smwdt, smwl, smwm, smwmc, smwu, smwp,
    smInitComplete = false, smWebDir, smBuildDir;

/**
 * smBaseDir: Apps Root directory.
 * smWebDir: Root directory from the contents will be served. Either built or source depending on env.
 *
 * sm-srcdir: Require path id pointing to root directory for the source files which are delivered.
 * in a 'prod' env to use the file in source form (i.e not minified version), use path with prefix 'sm-srcdir'
 * eg: use 'sm-srcdir/common/ui/js/sm.messages' as path
 * to access VRouterDashboardView source instead of minified js file.
 */

if (typeof smBaseDir !== 'undefined') {
    smBuildDir = '';
    smWebDir = smBaseDir; // will initialize the webDir with baseDir
    if ((typeof globalObj !== 'undefined') && globalObj.hasOwnProperty('buildBaseDir')) {
        smBuildDir = globalObj['buildBaseDir'];
    }

    require.config({
        baseUrl: smBaseDir,
        paths: getSMAppPaths(smBaseDir, smBuildDir),
        waitSeconds: 0
    });

    require(['sm-init'], function () {});
}

function getSMAppPaths(smBaseDir, smBuildDir) {
    smWebDir = smBaseDir + smBuildDir;
    return {
        'sm-srcdir': smBaseDir,
        'sm-basedir': smWebDir,
        'sm-constants': smWebDir + '/common/ui/js/sm.constants',
        'sm-utils': smWebDir + '/common/ui/js/sm.utils',
        'sm-labels': smWebDir + '/common/ui/js/sm.labels',
        'sm-messages': smWebDir + '/common/ui/js/sm.messages',
        'sm-model-config': smWebDir + '/common/ui/js/sm.model.config',
        'sm-grid-config': smWebDir + '/common/ui/js/sm.grid.config',
        'sm-detail-tmpls': smWebDir + '/common/ui/js/sm.detail.tmpls',
        'sm-parsers': smWebDir + '/common/ui/js/sm.parsers',
        'sm-init': smWebDir + '/common/ui/js/sm.init'
    };
}

if (typeof exports !== 'undefined' && module.exports) {
    exports = module.exports;
    exports.getSMAppPaths = getSMAppPaths;
}