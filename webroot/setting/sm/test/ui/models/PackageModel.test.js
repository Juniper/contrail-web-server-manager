define([
    'co-test-runner',
    'sm-test-utils',
    'sm-test-messages',
    'setting/sm/test/ui/models/PackageModel.mock.data',
    'co-form-model-validations-test-suite',
    'package-model-custom-test-suite',
], function (cotr, smtu, smtm, PackageModelMockData, FormValidationsTestSuite, PackageModelCustomTestSuite) {

    var moduleId = smtm.PACKAGE_MODEL_TEST_MODULE;

    var testType = cotc.MODEL_TEST;

    var getTestConfig = function () {
        return {
            tests: [
                {
                    model: 'PackageModel',
                    modelPathPrefix: 'setting/sm/ui/js/models/',
                    suites: [
                        {
                            class: FormValidationsTestSuite,
                            groups: ['all'],
                            modelConfig: {
                                mockData: PackageModelMockData,
                                validationKey: smwc.KEY_CONFIGURE_VALIDATION,
                            }
                        },
                        {
                            class: PackageModelCustomTestSuite,
                            groups: ['all'],
                            modelConfig: {
                                mockData: PackageModelMockData,
                                dataParsers: {
                                    modelDataParseFn: smtu.deleteFieldsForPackageModel
                                }
                            }
                        }
                    ]
                }
            ]
        };
    };

    var modelTestConfig = cotr.createPageTestConfig(moduleId, testType, null, null, getTestConfig, null);

    cotr.startTestRunner(modelTestConfig);

});