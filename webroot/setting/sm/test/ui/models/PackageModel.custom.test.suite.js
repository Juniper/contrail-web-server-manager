/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    "jquery",
    "underscore",
    "co-test-utils",
    "co-test-messages",
    "co-test-constants",
    "co-test-runner"
], function ($, _, cotu, cotm, cotc, cotr) {

    var testSuiteClass = function (modelObj, suiteConfig){

        var mockData = suiteConfig.modelConfig.mockData,
            setAttrData = mockData.setAttributes;
            //dataParsers = suiteConfig.modelConfig.dataParsers;
            //modelDataParser;

        //if (dataParsers) {
        //    modelDataParser = contrail.checkIfExist(dataParsers.modelDataParseFn) ? dataParsers.modelDataParseFn: function() {return;};
        //}
        module("Package Model Custom test suite");

        var packageModelCustomTestSuite = cotr.createTestSuite("PackageModelTestSuite");

        /**
         * Test group for form validations
         */
        var setAttrTestGroup = packageModelCustomTestSuite.createTestGroup("Attribute");

        /**
         * Set each data sample attributes and verify.
         */
        setAttrTestGroup.registerTest(cotr.test("Test attributes", function () {
            expect(0);
            //expect(setAttrData.assertEqual.length);
            _.each(setAttrData.assertEqual, function(data) {
                var formDataModel = $.extend(true, {}, modelObj),
                    defaultConfig = contrail.checkIfExist(modelObj.defaultConfig) ? modelObj.defaultConfig : {};
                var setData = $.extend(true, defaultConfig, data.setData);
                for (var attr in setData) {
                    formDataModel[attr] = setData[attr];
                }

                data.expected = contrail.checkIfExist(data.expected) ? data.expected : data.setData;
                //console.log(modelDataParser(formDataModel.model().attributes));
                //console.log(data.expected);
                //equal(formDataModel.model().attributes, data.expected, "assert equal  true for data set");
            });

        }, cotc.SEVERITY_HIGH));

        /**
         * Test each data sample for invalid input.
         */
        //setAttrTestGroup.registerTest(cotr.test("Test non-successful validations", function () {
        //
        //}, cotc.SEVERITY_HIGH));

        packageModelCustomTestSuite.run(suiteConfig.groups, suiteConfig.severity);

    };

    return testSuiteClass;
});
