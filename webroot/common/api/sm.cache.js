/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var logutils = require(process.mainModule.exports["corePath"] + "/src/serverroot/utils/log.utils"),
    commonUtils = require(process.mainModule.exports["corePath"] + "/src/serverroot/utils/common.utils"),
    coreConfig = require(process.mainModule.exports["corePath"] + "/config/config.global.js"),
    coreConstants = require(process.mainModule.exports["corePath"] + "/src/serverroot/common/global");

var smConstants = require("../../common/api/sm.constants"),
    smMessages = require("../../common/api/sm.messages"),
    sm = require("../../common/api/sm"),
    redis = require("redis");

var redisServerPort = (coreConfig.redis_server_port) ? coreConfig.redis_server_port : coreConstants.DFLT_REDIS_SERVER_PORT,
    redisServerIP = (coreConfig.redis_server_ip) ? coreConfig.redis_server_ip : coreConstants.DFLT_REDIS_SERVER_IP,
    redisClient = redis.createClient(redisServerPort, redisServerIP),
    smCache = {};

smCache.TAG_NAMES = [];

redisClient.select(coreConstants.SM_DFLT_REDIS_DB, function (error) {
    if (error) {
        logutils.logger.error(smMessages.get(smMessages.ERROR_REDIS_DB_SELECT, error));
    }
});

smCache.initTagNamesCache = function (callback) {
    var tagUrl = smConstants.TAG_DETAIL_URL;

    sm.get(tagUrl, function (error, responseJSON) {
        var tagName, tagNames = [];
        if (error) {
            logutils.logger.error(error.stack);
        } else {
            for (var i = 0; i < 7; i++) {
                tagName = responseJSON[smConstants.KEY_TAG + (i + 1)];
                if (tagName != null) {
                    tagNames.push(tagName);
                }
            }
            smCache.TAG_NAMES = tagNames;
        }

        if (callback != null) {
            callback();
        }
    });
};

smCache.deleteRedisCache = function (keyPrefix) {
    redisClient.keys(keyPrefix + "*", function (error, keysArray) {
        if (!error && keysArray.length > 0) {
            redisClient.del(keysArray, function (error) {
                if (error) {
                    logutils.logger.error(smMessages.get(smMessages.ERROR_DELETE_CACHE_4_PREFIX, keyPrefix));
                }
            });
        } else {
            logutils.logger.error(smMessages.get(smMessages.ERROR_DELETE_CACHE_4_PREFIX, keyPrefix));
        }
    });
};

smCache.handleTagValues = function (res, objectUrl, tagName) {
    var responseJSON = {}, tagValues = {},
        redisKey = smConstants.REDIS_TAG_VALUES;

    this.initTagNamesCache(function () {
        for(var i = 0; i < smCache.TAG_NAMES.length; i++) {
            tagValues[smCache.TAG_NAMES[i]] = [];
        }
        redisKey += ":" + objectUrl;

        redisClient.get(redisKey, function (error, tagValuesStr) {
            if (error) {
                logutils.logger.error(error.stack);
                commonUtils.handleJSONResponse(error, res, null);
            } else if (tagValuesStr == null) {
                sm.get(objectUrl, function (error, resultJSON) {
                    var keyValue, key, tags, servers;
                    if (error != null) {
                        commonUtils.handleJSONResponse(error, res);
                    } else {
                        servers = resultJSON[smConstants.KEY_SERVER];
                        for (var i = 0; i < servers.length; i++) {
                            tags = servers[i][smConstants.KEY_TAG];
                            for (key in tags) {
                                if (tagValues[key] == null) {
                                    tagValues[key] = [];
                                }
                                keyValue = tags[key];
                                if (tagValues[key].indexOf(keyValue) == -1) {
                                    tagValues[key].push(keyValue);
                                }
                            }
                        }
                    }
                    responseJSON = (tagName != null) ? (tagValues[tagName] != null ? tagValues[tagName] : []) : tagValues;
                    commonUtils.handleJSONResponse(null, res, responseJSON);
                    redisClient.setex(redisKey, smConstants.REDIS_CACHE_EXPIRE, JSON.stringify(tagValues));

                });
            } else {
                tagValues = JSON.parse(tagValuesStr);
                responseJSON = (tagName != null) ? (tagValues[tagName] != null ? tagValues[tagName] : []) : tagValues;
                commonUtils.handleJSONResponse(null, res, responseJSON);
            }
        });
    });
};

// Export this as a module.
module.exports = smCache;
